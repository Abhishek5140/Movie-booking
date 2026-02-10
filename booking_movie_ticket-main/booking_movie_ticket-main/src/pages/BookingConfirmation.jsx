import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { storage } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, city, hall, time, date } = location.state || {};
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (!movie || !city || !hall || !time || !date) {
      navigate('/dashboard');
      return;
    }

    const booking = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      movie: {
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      },
      city,
      cinema: {
        name: hall.name,
        location: hall.location
      },
      date,
      time,
      bookedAt: new Date().toISOString()
    };

    storage.saveBooking(booking);
  }, [movie, city, hall, time, date, currentUser, navigate]);

  if (!movie || !city || !hall || !time || !date) {
    return null;
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="booking-confirmation">
      <header className="page-header">
        <div className="header-content">
          <h1>Movie Booking</h1>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="page-content">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Booking Successful!</h2>
          <p className="success-message">
            Your ticket has been successfully booked.
          </p>

          <div className="booking-details-card">
            <h3>Booking Details</h3>

            <div className="details-section">
              <div className="detail-row">
                <span className="detail-label">Movie</span>
                <span className="detail-value">{movie.Title}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Cinema</span>
                <span className="detail-value">{hall.name}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Location</span>
                <span className="detail-value">{hall.location}, {city}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Date</span>
                <span className="detail-value">{date}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Show Time</span>
                <span className="detail-value highlight">{time}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Booked By</span>
                <span className="detail-value">{currentUser.name}</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleBackToDashboard} className="btn-primary">
              Book More Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
