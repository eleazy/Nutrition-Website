import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface lightState {
  lightState: boolean;
}

const initialState: lightState = {
  lightState: false,
};

const lightSlice = createSlice({
  name: "lightState",
  initialState,
  reducers: {
    toggle: (state) => {
      state.lightState = !state.lightState;
    },
  },
});

export const { toggle } = lightSlice.actions;
export default lightSlice.reducer;
