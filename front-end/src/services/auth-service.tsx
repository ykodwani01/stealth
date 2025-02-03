import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

interface RegisterData {
  email: string;
  password: string;
}

const register = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}register`, data);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message || "Registration failed");
  }
};

const login = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}login`, data);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message || "Login failed");
  }
}

const sendOTP = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}send-otp`, {email});
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message || "OTP failed");
  }
}
const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${API_URL}verify-otp`, {email, otp});
    return response.data;
  } catch (error) {
    throw new Error("Incorrect OTP");
  }
}

export default {
  register,login,sendOTP, verifyOTP
};