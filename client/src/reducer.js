import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "./store";
const initialState = {
   isDark: true,
};

export const theme = createSlice({
   name: "car",
   initialState,
   reducers: {
      setTheme: (state, action) => {
         state.isDark = action.payload;
      },
   },
});

export const { setTheme } = theme.actions;

export default theme.reducer;
