import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    storeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { storeCurrentUser } = userSlice.actions;

export default userSlice.reducer;
