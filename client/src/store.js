import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   isDark: Boolean,
};

export const themeSlice = createSlice({
   name: "isDark",
   initialState: {
      value: true,
   },
   reducers: {
      setTheme: (state) => {
         state.value = !state.value;
      },
   },
});

export const { setTheme } = themeSlice.actions;
export const theme = (state) => state.isDark;
export default configureStore({
   reducer: themeSlice.reducer,
});
