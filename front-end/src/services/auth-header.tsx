const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
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