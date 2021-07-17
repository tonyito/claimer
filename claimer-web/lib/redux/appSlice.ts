import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

type InitialState = {
  isLoggedIn: boolean;
  username: string | null;
};

export const appSlice = createSlice<
  InitialState,
  SliceCaseReducers<InitialState>,
  string
>({
  name: "app",
  initialState: { isLoggedIn: false, username: null },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    setLoggedOff: (state) => {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
});

export const { setLoggedIn, setLoggedOff } = appSlice.actions;
