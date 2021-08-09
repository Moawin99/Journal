require('dotenv').config();
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: 'http://localhost:8000/spotify/callback'
});


//logs user into spotify
router.get('/auth', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	const scopes = 'user-read-recently-played streaming playlist-read-private';
	const redirectUri = 'http://localhost:8000/spotify/callback';
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
		console.log(data.body);
		const { access_token, refresh_token } = data.body;
		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);
		res.redirect('http://localhost:8000');

	} catch (err) {
		res.redirect('/#/error/invalid token');
	}
});

//get a users playlists
router.get('/playlists', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		const playlists = await spotifyApi.getUserPlaylists();
		res.status(200).send({playlists: playlists});
	} catch (err) {
		res.status(400).send({error: err});
	}
});

router.post('/tracks', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	const { playlistID } = req.body;
	try {
		const tracks = await spotifyApi.getPlaylistTracks(playlistID);
		res.status(200).send({tracks: tracks.body});
	} catch (err) {
		res.status(400).send({error: err});
	}
});

module.exports = router;