import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface diarySavedType {
  diarySaved: boolean;
}

const initialState: diarySavedType = {
  diarySaved: false,
};

const diarySavedSlice = createSlice({
  name: "diarySaved",
  initialState,
  reducers: {
    diarySaveState: (state, action: PayloadAction<boolean>) => {
      state.diarySaved = action.payload;
    },
  },
});

export const { diarySaveState } = diarySavedSlice.actions;
export default diarySavedSlice.reducer;
