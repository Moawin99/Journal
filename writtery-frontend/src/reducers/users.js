import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
	name: "user",
	initialState: {value: null},
	reducers: {
		login: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const {login} = userDataSlice.actions;

export default userDataSlice.reducer;
