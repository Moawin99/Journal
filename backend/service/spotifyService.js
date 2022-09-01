const spotifyApi = require('../config/spotifyConfig');
const { formatTracks } = require('../utils/spotifyUtils');

/**
 * 
 * @param {*} tracks 
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
 * @param {Array} savedTracks 
 * @param {Array} audioFeatures 
 * @param {Number} mood 
 * @returns {Array} moodTracks
 * @description Takes in savedTracks array, audiofeatures of the saved tracks in order, and the mood.
 * Returns an array of the filtered songs by mood
 */
function filterByMood(savedTracks, audioFeatures, mood) {
	const moodTracks = [];
	for (let i = 0; i < audioFeatures.length; i++) {
		if (mood < 0.1) {
			if (audioFeatures[i].valence <= 0.1) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood > 0.1 && mood <= 0.25) {
			if (audioFeatures[i].valence > 0.1 && audioFeatures[i].valence <= 0.25) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood > 0.25 && mood <= 0.5) {
			if (audioFeatures[i].valence > 0.25 && audioFeatures[i].valence <= 0.5) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood > 0.5 && mood <= 0.75) {
			if (audioFeatures[i].valence > 0.5 && audioFeatures[i].valence <= 0.75) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood > 0.75 && mood <= 0.9) {
			if (audioFeatures[i].valence > 0.75 && audioFeatures[i].valence <= 0.9) {
				moodTracks.push(savedTracks[i]);
			}
		} else if (mood > 0.9 && mood <= 1) {
			if (audioFeatures[i].valence > 0.9 && audioFeatures[i].valence <= 1) {
				moodTracks.push(savedTracks[i]);
			}
		}
	}
	return moodTracks;
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
