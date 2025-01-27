import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { register } from './../slice/auth';

const Register = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For error messages
  const [success, setSuccess] = useState(false); // For success feedback

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    console.log(email)
    console.log(password)
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(false); // Reset success state

    try {
      // Dispatch the register action
      await dispatch(register({email, password })).unwrap();
      setSuccess(true); // Set success to true on successful registration
    } catch (err) {
      setError(err || 'An error occurred during registration.'); // Set error message
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      {error && <Alert severity="error">{error}</Alert>} {/* Show error */}
      {success && <Alert severity="success">Registration successful!</Alert>} {/* Show success */}

      <form onSubmit={handleRegister}>
        
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
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
