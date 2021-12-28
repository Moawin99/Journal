
const moodReducer = (state = 'Happy', action) => {
	switch(action.type){
		case 'moodSelection':
			return action.payload;
		default:
			return state;
	}
};

export default moodReducer;