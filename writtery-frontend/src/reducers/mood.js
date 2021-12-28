
const moodReducer = (state = 'Happy', action) => {
	switch(action.type){
		case 'MOODSELECTION':
			return action.payload;
		default:
			return state;
	}
};

export default moodReducer;