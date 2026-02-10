import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { showTimings } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import './ShowTimes.css';

const ShowTimes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, city, hall } = location.state || {};
  const { logout } = useAuth();
  const [selectedTime, setSelectedTime] = useState('');

  if (!movie || !city || !hall) {
    navigate('/dashboard');
    return null;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (!selectedTime) {
      alert('Please select a show time');
      return;
    }

    navigate('/booking-confirmation', {
      state: {
        movie,
        city,
        hall,
        time: selectedTime,
        date: formattedDate
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="show-times">
      <header className="page-header">
        <div className="header-content">
          <button onClick={handleBack} className="btn-back">
            ← Back
          </button>
          <h1>Movie Booking</h1>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="page-content">
        <div className="booking-summary">
          <div className="summary-card">
            {movie.Poster !== 'N/A' && (
              <img src={movie.Poster} alt={movie.Title} className="summary-poster" />
            )}
            <div className="summary-info">
              <h2>{movie.Title}</h2>
              <div className="summary-details">
                <div className="detail-item">
                  <span className="detail-label">Cinema:</span>
                  <span className="detail-value">{hall.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{hall.location}, {city}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="show-times-section">
          <h3>Select Show Time</h3>
          <div className="times-grid">
            {showTimings.map((time) => (
              <button
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>

          <button
            className="btn-book"
            onClick={handleBooking}
            disabled={!selectedTime}
          >
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowTimes;
