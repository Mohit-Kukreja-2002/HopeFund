import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
  redirection: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
    userRedirection: (state,action) => {
      state.redirection = action.payload.redirection;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut, userRedirection} = authSlice.actions;

export default authSlice.reducer;