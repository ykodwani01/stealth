import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/slice/auth';
import { AppDispatch } from "@/store"; 
import { useNavigate, Link } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
        const resultAction = await dispatch(registerUser(data));
        if (registerUser.fulfilled.match(resultAction)) {
          setSuccess(true);
          setError(null);
          navigate('/login');
        } else {
          setError("User already exists");
        }
      } catch (err) {
        setError('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        
        {error && <Alert className="mb-4 mx-6 w-30 text-red-500">{error}</Alert>}



        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    message: 'Password must contain letters and numbers',
                  },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full">Register</Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have account? <Link to="/login" className="text-blue-500">Login</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;