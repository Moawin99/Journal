const spotifyApi = require('../config/spotifyConfig');
const { formatTracks } = require('../utils/spotifyUtils');

/**
 * 
 * @param {Array} tracks 
 * @returns {Promise<Array>} ids
 * @description takes in array of track ids and gets the audio features of each song and returns 
 * an array of the details in the same order
 */
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

/**
 * 
 * @param {Array} tracks 
 * @param {Array} audioFeatures 
 * @param {Number} mood 
 * @description calcualtes a tracks distace from the mood then sorts it in decending order
 * @returns orderedTracks
 */
function filterByMood(tracks, audioFeatures, mood) {
	for (let i = 0; i < tracks.length; i++) {
		tracks[i].distanceFromMood = Math.abs(audioFeatures[i].mood - mood);
	}

	const orderedTracks =  tracks.sort((a, b) => (a.distanceFromMood > b.distanceFromMood) ? 1 : -1);

	return orderedTracks;
}

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

/**
 * 
 * @param {Number} page 
 * @returns {Object} data
 * @description fetches saved track data from spotify servers. If an error occurs
 * the error is returned along with a 400 status
 */
async function getSavedTracks(page) {
	try {
		const apiResponse = await spotifyApi.getMySavedTracks({ limit: 50, offset: page * 50});
		const tracks = formatTracks(apiResponse.body.items);
		return {
			total: apiResponse.body.total,
			tracks,
			page: page + 1,
			status: 200
		}
	} catch (error) {
		return {
			error,
			status: 400
		}
	}
}

module.exports = {
	getAudioFeaturesFromTrackObjects,
	filterByMood,
	getAudioFeatures,
	getSavedTracks
};
