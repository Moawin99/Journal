import { createSlice } from "@reduxjs/toolkit";

export const moodSlice = createSlice({
	name: "mood",
	initialState: {value: "Happy"},
	reducers: {
		selectMood: (state, action) => {
			state.value = action.payload;
		},
	},
});

export default moodSlice.reducer;