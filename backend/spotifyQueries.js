require('dotenv').config();
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: 'http://localhost:8000/callback'
});

const getCode = (req, res) => {
	const scopes = 'user-read-private user-read-email';
	const redirectUri = 'http://localhost:8000/callback';
	res.redirect(
		'https://accounts.spotify.com/authorize' +
			'?response_type=code' +
			'&client_id=' +
			process.env.CLIENT_ID +
			(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
			'&redirect_uri=' +
			encodeURIComponent(redirectUri)
	);
};

const callback = async (req, res) => {
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
};

const getMe = async (req, res) => {
	try {
		const result = await spotifyApi.getMe();
		res.status(200).send(result.body);
	} catch (err) {
		res.status(400).send(err);
	}
};

module.exports = {
	getCode,
	getMe,
	callback
};
