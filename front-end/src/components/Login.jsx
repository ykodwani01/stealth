import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login, sendOtp, verifyOtp, resetOtpSent } from '../slice/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const otpSent = useSelector((state) => state.auth.otpSent);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(login({ email, password })).unwrap();
      await handleSendOtp();
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleSendOtp = async () => {
    setError('');
    try {
      await dispatch(sendOtp({ email })).unwrap();
      setResendTimer(30);
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(verifyOtp({ email, otp })).unwrap();
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetOtpSent());
    };
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {!otpSent ? (
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <TextField
            fullWidth
            margin="normal"
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Verify OTP
          </Button>
          {resendTimer > 0 ? (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Resend OTP in {resendTimer} seconds
            </Typography>
          ) : (
            <Button onClick={handleSendOtp} variant="outlined" fullWidth sx={{ mt: 2 }}>
              Resend OTP
            </Button>
          )}
        </form>
      )}
    </Box>
  );
};

export default Login;