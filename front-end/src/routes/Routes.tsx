
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from '../component/Login';
import Register from '../component/Register';
import Home from '../component/home'
// import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
    return (
      <Router>
        <Routes>
           {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;