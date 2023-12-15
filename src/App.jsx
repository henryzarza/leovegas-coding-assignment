import { useState } from 'react';
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMovies } from './data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants';
import Header from './components/Header';
import Movies from './pages/Movies';
import Starred from './pages/Starred';
import WatchLater from './pages/WatchLater';
import YouTubePlayer from './components/YoutubePlayer';
import './app.scss';

function App() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [videoKey, setVideoKey] = useState();
  const [setOpen] = useState(false);
  const navigate = useNavigate();

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate('/');
    getSearchResults(query);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid) => vid.type === 'Trailer');
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);

    if (!videoKey) setOpen(true);
  };

  return (
    <div className='App'>
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <section className='container main-container'>
        {videoKey ? (
          <YouTubePlayer videoKey={videoKey} />
        ) : (
          <div style={{ padding: '30px' }}>
            <h6>no trailer available. Try another movie</h6>
          </div>
        )}

        <Routes>
          <Route path='/' element={<Movies viewTrailer={viewTrailer} />} />
          <Route path='/starred' element={<Starred viewTrailer={viewTrailer} />} />
          <Route path='/watch-later' element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path='*' element={<h1 className='not-found'>Page Not Found</h1>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
