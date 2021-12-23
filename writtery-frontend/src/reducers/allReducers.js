import moodReducer from './mood';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	mood: moodReducer
});

export default allReducers;