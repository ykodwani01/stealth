const authHeader = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  
    if (user && user.authToken) {
      // For Spring Boot back-end
      // return { Authorization: "Bearer " + user.accessToken };
  
      // for Node.js Express back-end
      return { "authToken": user.accessToken };
    } else {
      return {};
    }
  };
  
  export default authHeader;