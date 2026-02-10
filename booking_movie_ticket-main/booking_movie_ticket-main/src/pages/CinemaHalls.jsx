import { useLocation, useNavigate } from 'react-router-dom';
import { cinemaHalls } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import './CinemaHalls.css';

const CinemaHalls = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, city } = location.state || {};
  const { logout } = useAuth();

  if (!movie || !city) {
    navigate('/dashboard');
    return null;
  }

  const availableHalls = cinemaHalls.filter(hall => hall.city === city);

  const handleHallClick = (hall) => {
    navigate('/show-times', { state: { movie, city, hall } });
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="cinema-halls">
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
        <div className="movie-banner">
          <div className="movie-banner-content">
            {movie.Poster !== 'N/A' && (
              <img src={movie.Poster} alt={movie.Title} className="banner-poster" />
            )}
            <div className="banner-info">
              <h2>{movie.Title}</h2>
              <div className="banner-meta">
                <span>{movie.Year}</span>
                <span>•</span>
                <span>{movie.Type}</span>
                <span>•</span>
                <span>{city}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="halls-section">
          <h3>Select Cinema Hall</h3>
          {availableHalls.length === 0 ? (
            <div className="no-halls">
              No cinema halls available in {city}
            </div>
          ) : (
            <div className="halls-grid">
              {availableHalls.map((hall) => (
                <div
                  key={hall.id}
                  className="hall-card"
                  onClick={() => handleHallClick(hall)}
                >
                  <div className="hall-icon">🎭</div>
                  <div className="hall-info">
                    <h4>{hall.name}</h4>
                    <p>{hall.location}</p>
                    <p className="hall-city">{hall.city}</p>
                  </div>
                  <div className="hall-arrow">→</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CinemaHalls;
