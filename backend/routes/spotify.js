require('dotenv').config();
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
var SpotifyWebApi = require('spotify-web-api-node');
const { default: Axios } = require('axios');
var spotifyApi = new SpotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: 'http://localhost:8000/v1/spotify/callback'
});

//logs user into spotify
router.get('/auth', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	const scopes =
		'user-read-recently-played streaming playlist-read-private user-modify-playback-state user-read-email user-read-private user-library-read';
	const redirectUri = 'http://localhost:8000/v1/spotify/callback';
	res.send(
		'https://accounts.spotify.com/authorize' +
			'?response_type=code' +
			'&client_id=' +
			process.env.CLIENT_ID +
			(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
			'&redirect_uri=' +
			encodeURIComponent(redirectUri)
	);
});

//callback that gets called by spotify server during auth, creates access and refresh tokens
router.get('/callback', async (req, res) => {
	const { code } = req.query;
	try {
		const data = await spotifyApi.authorizationCodeGrant(code);
		const { access_token, refresh_token } = data.body;
		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);
		console.log('Logged in!');
		// res.redirect('http://localhost:8000');
		res.redirect(`http://localhost:3000/entry?access_token=${access_token}`);
	} catch (err) {
		res.redirect('/#/error/invalid token');
	}
});

//get a users playlists. Am returning object with playlist id, name and the image
router.get('/playlists', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		let playlists = [];
		const data = await spotifyApi.getUserPlaylists();
		for (let playlist of data.body.items) {
			playlists.push({
				id: playlist.id,
				name: playlist.name,
				image: playlist.images[0]
			});
		}
		res.status(200).send({ playlists: playlists });
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

//gets users saved tracks 50 at a time, while next is null keep paging and pushing to savedtracks array
router.get('/savedTracks', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		let savedTracks = [];
		let data = await spotifyApi.getMySavedTracks({ limit: 50 });
		while (data.body.next !== null) {
			for (let items of data.body.items) {
				track = items.track;
				savedTracks.push({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					image: track.album.images[0],
					uri: track.uri
				});
			}
			data = await Axios.get(data.body.next);
		}
		res.status(200).send({ length: savedTracks.length, savedTracks: savedTracks });
	} catch (error) {
		res.status(400).send({ err: error, message: 'Something went wrong' });
	}
});

//gets all tracks from a specified playlist
router.post('/tracks', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	const { playlistID } = req.body;
	try {
		let tracks = [];
		const data = await spotifyApi.getPlaylistTracks(playlistID);
		for (let trackObj of data.body.items) {
			const track = trackObj.track;
			tracks.push({
				id: track.id,
				name: track.name,
				artist: track.artists[0],
				image: track.album.images[0]
			});
		}
		res.status(200).send({ tracks: tracks });
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

//gets track audio features, need to seperate calls in batchs of 100 tracks
router.get('/features', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	const { ids } = req.body;
	const song_data = await getAudioFeatures(ids);
	res.status(200).send(song_data);
});

//gets saved tracks, then, gets audio features. filters them and returns new filtered array
// For testing i'm pushing the whole object. for the final version i think i will only push the uri
router.get('/moodTracks', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	const { mood } = req.body;
	let savedTracks = [];
	const data = await spotifyApi.getMySavedTracks({ limit: 50 });
	for (let items of data.body.items) {
		track = items.track;
		savedTracks.push({
			id: track.id,
			name: track.name,
			artist: track.artists[0].name,
			image: track.album.images[0],
			uri: track.uri
		});
	}
	let features = await getAudioFeaturesFromTrackObjects(savedTracks);
	let savedTracksAudioFeatures = features[0].audio_features;
	console.log(savedTracksAudioFeatures[0]);
	let moodTracks = filterByMood(savedTracks, savedTracksAudioFeatures, mood);
	res.status(200).send({ mood: mood, tracks: moodTracks });
});

async function getAudioFeatures(ids) {
	const song_data = [];
	if (ids.length > 100) {
		let temp_ids = [];
		for (let i = 0; i < ids.length; i++) {
			temp_ids.push(ids[i]);
			if (i % 100 === 0) {
				const data = await spotifyApi.getAudioFeaturesForTracks(temp_ids);
				song_data.push(data.body);
				temp_ids = [];
			}
		}
	} else {
		const data = await spotifyApi.getAudioFeaturesForTracks(ids);
		song_data.push(data.body);
	}
	return song_data;
}

async function getAudioFeaturesFromTrackObjects(tracks) {
	let ids = [];
	tracks.forEach((track) => ids.push(track.id));
	const song_data = [];
	if (ids.length > 100) {
		let temp_ids = [];
		for (let i = 0; i < ids.length; i++) {
			temp_ids.push(ids[i]);
			if (i % 100 === 0) {
				const data = await spotifyApi.getAudioFeaturesForTracks(temp_ids);
				song_data.push(data.body);
				temp_ids = [];
			}
		}
	} else {
		const data = await spotifyApi.getAudioFeaturesForTracks(ids);
		song_data.push(data.body);
	}
	return song_data;
}

function filterByMood(savedTracks, audioFeatures, mood) {
	let moodTracks = [];
	for (let i = 0; i < audioFeatures.length; i++) {
		// console.log(`${audioFeatures[i]['valence']}\n${audioFeatures[i].danceability}\n${audioFeatures[i].energy}\n`);
		if (mood == 0.2) {
			if (
				audioFeatures[i].valence <= 0.313 &&
				audioFeatures[i].danceability <= mood * 2.5 &&
				audioFeatures[i].energy <= mood * 2.5
			) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood == 0.4) {
			if (0.3 <= audioFeatures[i].valence <= 0.5) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood == 0.6) {
			if (
				0.4 <= audioFeatures[i].valence <= 0.7 &&
				0.5 <= audioFeatures[i].danceability <= 0.65 &&
				0.2 <= audioFeatures[i] <= 0.5
			) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood == 0.8) {
			if (0.6 <= audioFeatures[i].valence <= 0.8) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood == 1.0) {
			if (0.8 <= audioFeatures[i].valence <= 1.0) {
				moodTracks.push(savedTracks[i]);
			}
		}
	}
	return moodTracks;
}

module.exports = router;
