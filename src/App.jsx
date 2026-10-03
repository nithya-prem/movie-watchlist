import React,{useState,useEffect} from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import Watchlist from './components/Watchlist';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'];

useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/movies.json');
        setMovies(response.data);
        setLoading(false);
      }
      catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  const handleAddWatchList = (movie) => {
    if (!watchlist.some(item => item.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const handleRemoveWatchList = (movie) => {
    setWatchlist(watchlist.filter(item => item.id !== movie.id));
  };

  const filteredMovies = selectedGenre === 'All' ? movies : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Your personal cinema journal</p>
          <h1>Film <span>library</span></h1>
        </div>
        <div className="watch-count" aria-live="polite">
          <strong>{watchlist.length}</strong>
          <span>on your list</span>
        </div>
      </header>
      <nav className="filter-bar" aria-label="Filter movies by genre">
        <span className="filter-label">Browse by genre</span>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`genre-button${selectedGenre === genre ? ' is-selected' : ''}`}
            aria-pressed={selectedGenre === genre}
          >
            {genre}
          </button>
        ))}
      </nav>
      <div className="content-layout">
        <section className="catalog-section" aria-labelledby="catalog-title">
          <div className="section-heading">
            <h2 id="catalog-title">The collection</h2>
            {!loading && <p>{filteredMovies.length} films</p>}
          </div>
          <div className="movie-grid">
            {loading ? (
              <p className="loading-message">Finding your films...</p>
            ) : filteredMovies.length ? (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddWatchList={handleAddWatchList}
                  isInWatchList={watchlist.some(item => item.id === movie.id)}
                />
              ))
            ) : (
              <p className="empty-results">No films in this genre yet.</p>
            )}
          </div>
        </section>
        <Watchlist watchlist={watchlist} onRemoveWatchList={handleRemoveWatchList} />
      </div>
    </main>
  );
}

export default App;