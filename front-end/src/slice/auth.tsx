// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth-service'; // import your service file

// Define the initial state of the auth slice
interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Define async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);
      return response; // return the response data
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

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // assuming the response contains the user data
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // setting error if registration fails
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // assuming the response contains the user data
      })
      .addCase(loginUser.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

// Export the actions and reducer
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
