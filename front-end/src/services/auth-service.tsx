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
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message || "Login failed");
  }
}

export default {
  register,login
};