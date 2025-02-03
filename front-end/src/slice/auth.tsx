import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '@/services/auth-service';
import { RootState } from '@/store';
interface AuthState {
  user: any;
  email: string | null;
  authToken: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  email: null,
  authToken: null,
  error: null,
  loading: false,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(data);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const sendOtp = createAsyncThunk(
  'auth/send-otp',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const response = await authService.sendOTP(data.email);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verify-otp',
  async (data: {email:string, otp: string }, { getState, rejectWithValue }) => {
    
    
    try {
      const response = await authService.verifyOTP(data.email, data.otp);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.loading = false;
      state.user = null;
      state.email = null;
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.email = action.payload.email;
        state.authToken = action.payload.authToken;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.email = action.meta.arg.email;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;