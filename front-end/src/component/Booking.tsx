import React from 'react';
import { useParams } from 'react-router-dom';
import { useBookSlotMutation } from '../services/bookingApi';
import Navbar from './navbar';
import '../assets/home.css';

const BookingPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [bookSlot, { isLoading, isSuccess, isError }] = useBookSlotMutation();

  const handleBookSlot = async () => {
    try {
      await bookSlot(gameId).unwrap();
      alert('Slot booked successfully!');
    } catch (error) {
      alert('Failed to book slot.');
    }
  };

  return (
    <>
      <div><Navbar brandName="GameHub" /></div>
      <div className="home-page">
        <h1>Book Slot for Game {gameId}</h1>
        <div className="game-cards-container padded-container">
          <button onClick={handleBookSlot} disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book Slot'}
          </button>
          {isSuccess && <p>Slot booked successfully!</p>}
          {isError && <p>Failed to book slot. Please try again.</p>}
        </div>
      </div>
    </>
  );
};

export default BookingPage;