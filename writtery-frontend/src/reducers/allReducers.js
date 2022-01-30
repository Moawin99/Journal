import moodReducer from './mood';
import userReducer from './users';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	mood: moodReducer,
	user: userReducer
});

export default allReducers;