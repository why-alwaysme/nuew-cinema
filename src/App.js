import './App.css';
import { getTvList, searchTv } from './Api';
import { useEffect, useState } from 'react';

const App = () => {
  const [popularTv, setPopularTv] = useState([]);

  useEffect(() => {
    getTvList().then(result => {
      setPopularTv(result);
    });
  }, []);

  const PopularTvList = () => {
    return popularTv.map((tv, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{tv.original_name}</div>
          <img
            className="movie-image"
            alt=".-."
            src={`${process.env.REACT_APP_BASEIMGURL}/${tv.poster_path}`}
          />
          <div className="movie-date">{tv.first_air_date}</div>
          <div className="movie-rate">{tv.vote_average}</div>
        </div>
      );
    });
  };

  const search = async q => {
    if (q.length > 3) {
      const query = await searchTv(q);
      setPopularTv(query.results);
    }
  };

  console.log({ popularTv: popularTv });

  return (
    <div className="App">
      <header className="App-header">
        <h1>NUEW CINEMA</h1>
        <input
          placeholder="cari film..."
          className="movie-search"
          onChange={({ target }) => search(target.value)}
        />

        <div className="movie-container">
          <PopularTvList />
        </div>
      </header>
    </div>
  );
};

export default App;
