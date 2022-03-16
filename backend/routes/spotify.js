require('dotenv').config();
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
var SpotifyWebApi = require('spotify-web-api-node');
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

router.get('/savedTracks', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		let savedTracks = [];
		const data = await spotifyApi.getMySavedTracks({ limit: 50 });
		// res.status(200).send(data);
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
		res.status(200).send(savedTracks);
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
	res.status(200).send(song_data);
});

module.exports = router;
