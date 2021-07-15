import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: { dev: false },
  reducers: {
    turnOnDev: (state) => {
      state.dev = true;
    },
    turnOffDev: (state) => {
      state.dev = false;
    },
  },
});

export const { turnOnDev, turnOffDev } = appSlice.actions;
