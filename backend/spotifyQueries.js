require('dotenv').config();

// const getToken = async () => {
// 	const redirectUri = encodeURIComponent('http://localhost:8000');
// 	const scopes = [ 'user-read-private', 'user-read-email' ];
// 	const result = await fetch(
// 		'https://accounts.spotify.com/authorize?client_id=' +
// 			process.env.CLIENT_ID +
// 			'&response_type=code&redirect_uri=' +
// 			redirectUri +
// 			'callback&scope=' +
// 			scopes.join(' '),
// 		{
// 			method: 'GET'
// 		}
// 	);

// 	const data = await result.json();
// 	console.log(data);
// };

const getCode = async (req, res) => {
	const scopes = 'user-read-private user-read-email';
	const redirectUri = 'http://localhost:8000';
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

const getTokens = async () => {
	const redirectUri = 'http://localhost:8000';
	const result = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: 'Basic' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
		},
		body: {
			grant_type: 'authorization_code',
			code: process.env.SPOTIFY_CODE,
			redirect_uri: encodeURIComponent(redirectUri)
		}
	});

	const data = await result.json();
	console.log(data);
};

module.exports = {
	getCode,
	getTokens
};
