require('dotenv').config();
const express = require('express');
const router = express.Router();
const spotifyService = require('../service/spotifyService');
const middleware = require('../middleware');
const spotifyApi = require('../config/spotifyConfig');
const { formatTracks } = require('../utils/spotifyUtils');

//logs user into spotify
router.get('/auth', middleware.validateJwt, async (req, res) => {
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
router.get('/playlists', middleware.validateJwt, async (req, res) => {
	try {
		let playlists = [];
		const data = await spotifyApi.getUserPlaylists({ limit: 50 });
		const total = data.body.total;
		for (let playlist of data.body.items) {
			playlists.push({
				id: playlist.id,
				name: playlist.name,
				image: playlist.images[0],
				total: playlist.tracks.total
			});
		}
		res.status(200).send({ total, playlists: playlists });
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

//gets users saved tracks 50 at a time, while next is null keep paging and pushing to savedtracks array
router.get('/savedTracks', middleware.validateJwt, async (req, res) => {
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
			break;
			//need to find a way to fetch all tracks
		}
		res.status(200).send({ length: savedTracks.length, savedTracks: savedTracks });
	} catch (error) {
		res.status(400).send({ err: error, message: error.message });
	}
});

//gets all tracks from a specified playlist
router.post('/tracks', middleware.validateJwt, async (req, res) => {
	const { playlistID } = req.body;
	try {
		const data = await spotifyApi.getPlaylistTracks(playlistID);
		const tracks = formatTracks(data.body.items);
		res.status(200).send({ total: tracks.length, tracks: tracks });
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

//gets track audio features, need to seperate calls in batchs of 100 tracks
router.get('/features', middleware.validateJwt, async (req, res) => {
	const { ids } = req.body;
	const song_data = await spotifyService.getAudioFeatures(ids);
	res.status(200).send(song_data);
});

//gets saved tracks, then, gets audio features. filters them and returns new filtered array
// For testing i'm pushing the whole object. for the final version i think i will only push the uri
router.get('/moodTracks', async (req, res) => {
	const mood = Number(req.body.mood);
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
	const features = await spotifyService.getAudioFeaturesFromTrackObjects(savedTracks);
	const savedTracksAudioFeatures = features[0].audio_features;
	const moodTracks = spotifyService.filterByMood(savedTracks, savedTracksAudioFeatures, mood);
	res.status(200).send({ mood: mood, numberOfSongs: moodTracks.length, tracks: moodTracks });
});

module.exports = router;
