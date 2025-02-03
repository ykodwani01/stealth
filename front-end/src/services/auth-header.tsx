const authHeader = () => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : "";
  
    if (user && user.authToken) {
     
      return { "authToken": user.accessToken };
    } else {
      return {};
    }
  };
  
  export default authHeader;