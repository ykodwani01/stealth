import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Navbar  from './navbar';
interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm<FormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    const API_URL = 'http://localhost:8000/api/contact';
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setSuccessMessage('Message sent successfully!');
      // Clear the form after success
      reset();
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  return (
    <>
    <Navbar brandName="GameHub" links={[]} />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

        {successMessage && <div className="mb-4 text-green-500 text-center">{successMessage}</div>}
        {errorMessage && <div className="mb-4 text-red-500 text-center">{errorMessage}</div>}

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register('name', {
                  required: 'Name is required',
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-700">Message</Label>
              <textarea
                id="message"
                placeholder="Enter your message"
                {...register('message', {
                  required: 'Message is required',
                })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full p-3 bg-gray-900 text-white font-semibold rounded-lg disabled:bg-gray-900"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default ContactUs;
