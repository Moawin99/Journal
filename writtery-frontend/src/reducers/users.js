import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
	name: "user",
	initialState: {data: null},
	reducers: {
		login: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const {login} = userDataSlice.actions;

export default userDataSlice.reducer;
