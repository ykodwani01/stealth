import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth-service";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoggedIn: !!user,
  user: user || null,
  token: user?.token || null,
  otpSent: false, // Add otpSent state
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await authService.register(email, password);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      return { user: data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email }, thunkAPI) => {
    try {
      const response = await authService.sendOtp(email);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const data = await authService.verifyOtp(email, otp);
      return { user: data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetOtpSent: (state) => {
      state.otpSent = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false; // User is not logged in immediately after signup
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.otpSent = true; // Set otpSent to true when OTP is sent
      })
      .addCase(sendOtp.rejected, (state) => {
        state.otpSent = false; // Set otpSent to false if sending OTP fails
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { resetOtpSent } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;