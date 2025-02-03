import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { verifyOtp } from '@/slice/auth';
import { AppDispatch, RootState } from "@/store";

interface FormData {
  otp: string;
}

const Otp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const email = useSelector((state: RootState) => state.auth.email);

  const onSubmit = async (data: FormData) => {
    try {
        
      if (!email) {
        setError('Email is required');
        return;
      }
      const resultAction = await dispatch(verifyOtp({ email, otp: data.otp }));
      console.log(resultAction)
      if (verifyOtp.fulfilled.match(resultAction)) {
        setError(null);
        localStorage.setItem('authToken', resultAction.payload.authToken)
        navigate('/');
      } else {
        setError(resultAction.payload as string);
      }
    } catch (err) {
      setError('OTP verification failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>

        {error && <Alert className="mb-4 text-red-500">{error}</Alert>}

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>OTP</Label>
              <Input
                type="text"
                placeholder="Enter your OTP"
                {...register('otp', {
                  required: 'OTP is required',
                })}
              />
              {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
            </div>

            <Button type="submit" className="w-full">Verify OTP</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Otp;