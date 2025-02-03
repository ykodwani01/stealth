import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth"; // Adjust the path as needed
import { bookingApi } from "./services/bookingApi"; // Import the bookingApi

const store = configureStore({
  reducer: {
    auth: authReducer, // Add other reducers if needed
    [bookingApi.reducerPath]: bookingApi.reducer, // Add the bookingApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookingApi.middleware), // Add the bookingApi middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;