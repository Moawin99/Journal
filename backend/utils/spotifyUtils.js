/**
 * 
 * @param {Array} trackList 
 * @returns {Array} tracks
 * @description trims unwanted data off of trackLists
 */
const formatTracks = (trackList) => {
	const tracks = trackList.filter((song) => song.track).map((song, index) => {
		return {
			id: song.track.id,
			name: song.track.name,
			uid: index,
			artist: song.track.artists[0].name,
			image: song.track.album.images[0],
			uri: song.track.uri
		};
	});
	return tracks;
};

const getTracksFromPlaylist = (playlistId, totalTracks) => {};

module.exports = {
	formatTracks
};
