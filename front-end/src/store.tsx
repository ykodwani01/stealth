import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth"; // Adjust the path as needed

const store = configureStore({
  reducer: {
    auth: authReducer, // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;