import { useMemo, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import starredSlice from '../../data/starredSlice';
import watchLaterSlice from '../../data/watchLaterSlice';
import placeholder from '../../assets/not-found-500X750.jpeg';
import './styles.scss';
import AppContext from '../../contexts';

function Movie({ movie }) {
  const watchMovieTrailer = useContext(AppContext);
  const { starred, watchLater } = useSelector((state) => state);
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  const dispatch = useDispatch();

  const isWatchedLater = useMemo(
    () => Boolean(watchLater.watchLaterMovies.find(({ id }) => id === movie.id)),
    [watchLater.watchLaterMovies.length]
  );
  const isStarred = useMemo(
    () => Boolean(starred.starredMovies.find(({ id }) => id === movie.id)),
    [starred.starredMovies.length]
  );

  const handleWatchLater = useCallback(() => {
    dispatch(isWatchedLater ? removeFromWatchLater(movie.id) : addToWatchLater(movie));
  }, [isWatchedLater]);

  const handleStarMovie = useCallback(() => {
    dispatch(isStarred ? unstarMovie(movie.id) : starMovie(movie));
  }, [isStarred]);

  return (
    <div className='movie-card'>
      <img
        className='movie-card__poster'
        src={
          movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder
        }
        alt={`${movie.title} poster`}
      />
      <h6 className='movie-card__title'>{movie.title}</h6>

      {/* Card actions buttons */}
      <div className='movie-card__actions'>
        <button
          type='button'
          aria-label={`${isStarred ? 'Remove' : 'Add'} ${movie.title} to favorite list`}
          title='Add to favorite'
          className={`btn btn-icon btn-star ${isStarred ? 'active' : ''}`}
          data-testid='star-movie'
          onClick={handleStarMovie}
        >
          <i className='bi bi-star-fill' />
        </button>
        <button
          type='button'
          data-testid='watch-later'
          className={`btn btn-icon btn-watch-later ${isWatchedLater ? 'active' : ''}`}
          aria-label={`${isWatchedLater ? 'Remove' : 'Add'} ${movie.title} to watch later`}
          title='Watch Later'
          onClick={handleWatchLater}
        >
          <i className='bi bi-stopwatch-fill' />
        </button>
      </div>

      {/* Movie information */}
      <div className='movie-card__info_panel'>
        <p className='movie-card__info_description'>{movie.overview}</p>
        <span className='movie-card__info_year'>
          Release: {movie.release_date?.substring(0, 4)}
        </span>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => watchMovieTrailer(movie.id)}
        >
          Watch Trailer
        </button>
      </div>
    </div>
  );
}

export default Movie;
