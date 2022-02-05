export const selectMood = (mood) => {
	return{
		type: 'MOODSELECTION',
		payload: mood
	};
};