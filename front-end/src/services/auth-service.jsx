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

const logout = ()=> {
    localStorage.removeItem("user");

};

const authService = ()=>{
    register,
    login,
    logout
}

export default authService;