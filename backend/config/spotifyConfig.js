var SpotifyWebApi = require("spotify-web-api-node");
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:8000/v1/spotify/callback",
});

module.exports = spotifyApi