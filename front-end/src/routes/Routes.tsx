
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../component/Login';
import Register from '../component/Register';
import Home from '../component/home'
import BookingPage from '../component/Booking';
// import PrivateRoute from './PrivateRoute';
import ContactUs from '../component/contactus';
import Otp from '../component/Otp';


const AppRoutes = () => {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/otpVerification" element={<Otp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/book/:gameId" element={<BookingPage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;