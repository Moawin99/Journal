/**
 * 
 * @param {Array} trackList 
 * @returns {Array} tracks
 * @description trims unwanted data off of trackLists
 */
const formatTracks = (trackList) => {
	const tracks = trackList.filter((song) => song.track).map((song) => {
		return {
			id: song.track.id,
			name: song.track.name,
			artist: song.track.artists[0].name,
			image: song.track.album.images[0],
			uri: song.track.uri
		};
	});
	return tracks;
};

/**
 * 
 * @param {Array} featureList 
 * @returns {Array} features
 * @description trims unwanted data off audio features
 */
const formatAudioFeatures = (featureList) => {
	const features = featureList.map((song) => {
		const track = {
			id: song.id,
			valence: song.valence,
			danceability: song.danceability,
			energy: song.energy,
			uri: song.uri
		}
		track.mood = (track.danceability + track.energy + track.valence) / 3;
		return track;
	});
	return features;
}


module.exports = {
	formatTracks,
	formatAudioFeatures
};
