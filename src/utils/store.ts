import { configureStore } from "@reduxjs/toolkit";
import lightReducer from "./lightSlice";
import showFoodInfoReducer from "./showFoodInfoSlice";
import foodIdReducer from "./foodIdSlice";
import diarySavedReducer from "./diarySavedSlice";

const store = configureStore({
  reducer: {
    light: lightReducer,
    showFoodInfo: showFoodInfoReducer,
    foodId: foodIdReducer,
    diarySaved: diarySavedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
