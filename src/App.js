import './App.css';
import { getMovieList, seacrhMovie } from './api';
import { useEffect, useState } from 'react';

const App = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleSearchInput = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(async () => {
        if (searchTerm.length > 3) {
          const query = await seacrhMovie(searchTerm);
          setPopularMovie(query.results);
        } else {
          const result = await getMovieList();
          setPopularMovie(result);
        }
      }, 500)
    );
  };

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovie(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div className='Movie-wrapper' key={i}>
          <div className='Movie-title'>{movie.title}</div>
          <img
            className='Movie-image'
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
          <div className='Movie-date'>Release: {movie.release_date}</div>
          <div className='Movie-rate'>{movie.vote_average}</div>
        </div>
      );
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Ramdhan Movie</h1>
        <input
          placeholder='Cari Film kesayangan'
          className='Movie-search'
          onChange={handleSearchInput}
          value={searchTerm}
        />
        <div className='Movie-container'>
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
