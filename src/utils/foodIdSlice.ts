import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface foodIdType {
  foodId: number;
}

const initialState: foodIdType = {
  foodId: 0,
};

const foodIdSlice = createSlice({
  name: "foodId",
  initialState,
  reducers: {
    setFoodId: (state, action: PayloadAction<number>) => {
      state.foodId = action.payload;
    },
  },
});

export const { setFoodId } = foodIdSlice.actions;
export default foodIdSlice.reducer;
