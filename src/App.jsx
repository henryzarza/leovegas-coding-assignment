import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useSearchParams, createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';

import { fetchMovies } from './data/moviesSlice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants';
import Header from './components/Header';
import Movies from './pages/Movies';
import Starred from './pages/Starred';
import WatchLater from './pages/WatchLater';
import AppContext from './contexts';
import YouTubePlayer from './components/YoutubePlayer';
import './app.scss';

function App() {
  const dispatch = useDispatch();
  const [videoKey, setVideoKey] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const searchMovies = (query) => {
    navigate('/');
    if (query) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const watchMovieTrailer = useCallback(async (movieId) => {
    // TODO: implement a cache with Context to avoid requesting for a movie that the user already watched the trailer
    const videoData = await fetch(
      `${ENDPOINT}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`
    ).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const key =
        videoData.videos.results[0].key ||
        videoData.videos.results.find((vid) => vid.type === 'Trailer').key;
      setVideoKey(key);
      setModalOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setVideoKey(null);
  };

  return (
    <>
      <Header searchMovies={searchMovies} />

      <main className='container main-container'>
        <AppContext.Provider value={watchMovieTrailer}>
          <Routes>
            <Route path='/' element={<Movies />} />
            <Route path='/starred' element={<Starred />} />
            <Route path='/watch-later' element={<WatchLater />} />
            <Route path='*' element={<h1 className='main-title'>Page Not Found</h1>} />
          </Routes>
        </AppContext.Provider>
      </main>

      <Popup open={isModalOpen} onClose={handleCloseModal} closeOnDocumentClick>
        <button
          type='button'
          aria-label='Close modal'
          className='btn btn-outline-danger btn-close-modal'
          onClick={handleCloseModal}
        >
          <i className='bi bi-x-lg' />
        </button>
        {videoKey && <YouTubePlayer videoKey={videoKey} />}
      </Popup>
    </>
  );
}

export default App;
