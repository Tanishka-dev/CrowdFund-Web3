import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store = configureStore({
   reducer: {
      car: carReducer,
   },
});

export const useAppDispatch = () => useDispatch(); // Export a hook that can be reused to resolve types
export const useAppSelector = useSelector;
