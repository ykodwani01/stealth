import axios from "axios";

const API_URL = "http://localhost:80/api/auth/";

const register = async (email, password) => {
    try {
      const response = await axios.post(API_URL + "register", { email, password });
      return response.data;
    } catch (error) {
     
      console.error("Registration error:", error);
       
    }
  };
  
  const login = async (email, password) => {
    try {
      const response = await axios.post(API_URL + "login", { email, password });
      if (response.data.authToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      
      console.error("Login error:", error);
     
    }
  };

  const sendOtp = async (email) => {
    try {
      const response = await axios.post(API_URL + "send-otp", { email });
      return response.data;
    } catch (error) {
      console.error("Send OTP error:", error);
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const response = await axios.post(API_URL + "verify-otp", { email, otp });
      if (response.data.authToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("Verify OTP error:", error);
    }
  }
const logout = ()=> {
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