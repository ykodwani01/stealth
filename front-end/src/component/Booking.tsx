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
  const [slot, setSlot] = useState('');
  const [date, setDate] = useState('');

  const generateSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      const start = `${i.toString().padStart(2, '0')}:00`;
      const end = `${(i + 1).toString().padStart(2, '0')}:00`;
      slots.push(`${start} - ${end}`);
    }
    return slots;
  };

  const handleBookSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameId) {
      alert('Game ID is missing.');
      return;
    }
    try {
      await bookSlot({ gameId, people, time: slot, date }).unwrap();
      alert('Slot booked successfully!');
    } catch (error) {
      alert('Failed to book slot.');
    }
  };

  return (
    <>
      <div><Navbar brandName="GameHub" links={[]} /></div>
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
                  <Label htmlFor="slot">Select Slot</Label>
                  <select
                    id="slot"
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select a slot</option>
                    {generateSlots().map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
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