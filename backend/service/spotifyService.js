const spotifyApi = require('../config/spotifyConfig')

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

function filterByMood(savedTracks, audioFeatures, mood) {
  let moodTracks = [];
  for (let i = 0; i < audioFeatures.length; i++) {
    // console.log(`${audioFeatures[i]['valence']}\n${audioFeatures[i].danceability}\n${audioFeatures[i].energy}\n`);
    if (mood < .10) {
      if (
        audioFeatures[i].valence <= (mood + .15) &&
        audioFeatures[i].danceability <= (mood * 8) &&
        audioFeatures[i].energy <= (mood * 10)
      ) {
        moodTracks.push(savedTracks[i]);
      }
    } else if (.10 <= mood < .25) {
      if (        
        (mood - .075) <= audioFeatures[i].valence <= (mood + .075) &&
        audioFeatures[i].danceability <= (mood * 4) &&
        audioFeatures[i].energy <= (mood * 5)) {
        moodTracks.push(savedTracks[i]);
      }
    } else if (.25 <= mood < .50) {
      if (
        (mood - .05) <= audioFeatures[i].valence <= (mood + .05) &&
        audioFeatures[i].danceability <= (mood * 1.75) &&
        audioFeatures[i].energy <= (mood * 1.75)
      ) {
        moodTracks.push(savedTracks[i]);
      }
    } else if (.50 <= mood < .75) {
      if (        
        (mood - .075) <= audioFeatures[i].valence <= (mood + .075) &&
        audioFeatures[i].danceability <= (mood / 2.5) &&
        audioFeatures[i].energy <= (mood / 2)) {
        moodTracks.push(savedTracks[i]);
      }
    } else if (.75 <= mood < .90) {
      if (        
        (mood - .075) <= audioFeatures[i].valence <= (mood + .075) &&
        audioFeatures[i].danceability <= (mood / 2) &&
        audioFeatures[i].energy <= (mood / 1.75)) {
        moodTracks.push(savedTracks[i]);
      }
    } else if (mood >= .90) {
      if (        
        (mood - .15) <= audioFeatures[i].valence <= 1 &&
        audioFeatures[i].danceability <= (mood / 1.75) &&
        audioFeatures[i].energy <= (mood / 1.5)) {
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

module.exports = {
  getAudioFeaturesFromTrackObjects,
  filterByMood,
  getAudioFeatures,
};
