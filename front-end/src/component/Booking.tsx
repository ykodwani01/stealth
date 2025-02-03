import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookSlotMutation } from '../services/bookingApi';
import Navbar from './navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import { Input} from '@/components/ui/input';
import { Label} from '@/components/ui/label';
import '../assets/home.css';

const BookingPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [bookSlot, { isLoading, isSuccess, isError }] = useBookSlotMutation();
  const [people, setPeople] = useState(1);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const handleBookSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameId) {
      alert('Game ID is missing.');
      return;
    }
    try {
      await bookSlot({ gameId, people, time, date }).unwrap();
      alert('Slot booked successfully!');
    } catch (error) {
      alert('Failed to book slot.');
    }
  };

  return (
    <>
      <Navbar brandName="GameHub" links={[]} />
      <div className="booking-page">
        <h1>Book Slot for Game {gameId}</h1>
        <div className="booking-container">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookSlot}>
                <div className="form-group">
                  <Label htmlFor="people">Number of People</Label>
                  <Input
                    id="people"
                    type="number"
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Booking...' : 'Book Slot'}
                </Button>
              </form>
              {isSuccess && <p>Slot booked successfully!</p>}
              {isError && <p>Failed to book slot. Please try again.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BookingPage;