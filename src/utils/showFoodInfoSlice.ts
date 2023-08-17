import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface foodInfoState {
  foodInfoState: boolean;
}

const initialState: foodInfoState = {
  foodInfoState: false,
};

const showFoodInfoSlice = createSlice({
  name: "foodInfoState",
  initialState,
  reducers: {
    showInfo: (state, action: PayloadAction<boolean>) => {
      state.foodInfoState = action.payload;
    },
  },
});

export const { showInfo } = showFoodInfoSlice.actions;
export default showFoodInfoSlice.reducer;
