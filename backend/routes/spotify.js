require('dotenv').config();
const express = require('express');
const router = express.Router();
const spotifyService = require('../service/spotifyService');
const middleware = require('../middleware');
const spotifyApi = require('../config/spotifyConfig');
const { formatTracks, formatAudioFeatures } = require('../utils/spotifyUtils');

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

//gets users savedTracks 50 at a time. pagenates with page variable
router.post('/savedTracks', middleware.validateJwt, async (req, res) => {
	const page = Number(req.body.page);
	const data = await spotifyService.getSavedTracks(page);
	return res.status(data.status).send({ data })
})

//gets all tracks from a specified playlist
router.post('/tracks', middleware.validateJwt, async (req, res) => {
	const { playlistID } = req.body;
	const page = Number(req.body.page);
	try {
		const data = await spotifyApi.getPlaylistTracks(playlistID, { limit: 50, offset: page * 50 });
		const tracks = formatTracks(data.body.items);
		const isLastPage = data.body.total <= 50*(page + 1);
		return res.status(200).send({ total: data.body.total, tracks: tracks, nextPage: isLastPage ? null: page + 1  });
	} catch (err) {
		return res.status(400).send({ error: err });
	}
});

//gets track audio features, need to seperate calls in batchs of 100 tracks
router.get('/features', middleware.validateJwt, async (req, res) => {
	const { ids } = req.body;
	const song_data = await spotifyService.getAudioFeatures(ids);
	const audioFeatures = formatAudioFeatures(song_data[0].audio_features)
	res.status(200).send({ audioFeatures });
});

//gets saved tracks, then, gets audio features. filters them and returns new filtered array
// For testing i'm pushing the whole object. for the final version i think i will only push the uri
router.post('/moodTracks', async (req, res) => {
	const mood = Number(req.body.mood);
	const page = Number(req.body.page);

	const data = await spotifyApi.getMySavedTracks({ limit: 50, offset: page*50 });
	const savedTracks = formatTracks(data.body.items);
	const featuresData = await spotifyService.getAudioFeaturesFromTrackObjects(savedTracks);
	const features = formatAudioFeatures(featuresData[0].audio_features);
	const moodTracks = spotifyService.filterByMood(savedTracks, features, mood);
	res.status(200).send({ mood: mood, numberOfSongs: moodTracks.length, tracks: moodTracks });
});

module.exports = router;
