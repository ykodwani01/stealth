import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

interface AuthResponse {
  authToken?: string;
  [key: string]: any;
}

const register = async (email: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await axios.post<AuthResponse>(API_URL + "register", { email, password });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const login = async (email: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await axios.post<AuthResponse>(API_URL + "login", { email, password });
    if (response.data.authToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
  }
};

const sendOtp = async (email: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await axios.post<AuthResponse>(API_URL + "send-otp", { email });
    return response.data;
  } catch (error) {
    console.error("Send OTP error:", error);
  }
};

const verifyOtp = async (email: string, otp: string): Promise<AuthResponse | undefined> => {
  try {
    const response = await axios.post<AuthResponse>(API_URL + "verify-otp", { email, otp });
    if (response.data.authToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Verify OTP error:", error);
  }
};

const logout = (): void => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  sendOtp,
  verifyOtp,
  logout,
};

export default authService;