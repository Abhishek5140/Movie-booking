import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cities } from '../utils/mockData';
import './Dashboard.css';

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [searchTerm, selectedCity, movies]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const searchTerms = ['action', 'comedy', 'drama', 'thriller'];
      const allMovies = [];

      for (const term of searchTerms) {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${term}&apikey=d4540622`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          allMovies.push(...data.Search);
        }
      }

      const uniqueMovies = Array.from(
        new Map(allMovies.map(movie => [movie.imdbID, movie])).values()
      );

      setMovies(uniqueMovies);
      setFilteredMovies(uniqueMovies);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  const handleMovieClick = (movie) => {
    if (!selectedCity) {
      alert('Please select a city first');
      return;
    }
    navigate('/cinema-halls', { state: { movie, city: selectedCity } });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Movie Booking</h1>
          <div className="user-info">
            <span>Welcome, {currentUser?.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="city">Select City</label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="filter-select"
            >
              <option value="">Choose a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="search">Search Movie</label>
            <input
              type="text"
              id="search"
              placeholder="Search by movie name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>
        </div>
      </div>

      <main className="dashboard-content">
        {loading && <div className="loading-message">Loading movies...</div>}

        {error && <div className="error-message">{error}</div>}

        {!loading && !error && (
          <>
            {!selectedCity && (
              <div className="info-message">
                Please select a city to view available movies
              </div>
            )}

            {selectedCity && filteredMovies.length === 0 && (
              <div className="no-results">No movies found</div>
            )}

            {selectedCity && filteredMovies.length > 0 && (
              <div className="movies-grid">
                {filteredMovies.map((movie) => (
                  <div
                    key={movie.imdbID}
                    className="movie-card"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <div className="movie-poster">
                      {movie.Poster !== 'N/A' ? (
                        <img src={movie.Poster} alt={movie.Title} />
                      ) : (
                        <div className="no-poster">No Image</div>
                      )}
                    </div>
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.Title}</h3>
                      <div className="movie-meta">
                        <span className="movie-year">{movie.Year}</span>
                        <span className="movie-type">{movie.Type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
