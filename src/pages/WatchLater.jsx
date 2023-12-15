import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import watchLaterSlice from '../data/watchLaterSlice';
import Movie from '../components/Movie';

function WatchLater() {
  const { watchLater } = useSelector((state) => state);
  const { removeAllWatchLater } = watchLaterSlice.actions;
  const dispatch = useDispatch();

  return (
    <>
      <h2 className='main-title'>Watch Later List</h2>
      {watchLater.watchLaterMovies.length > 0 ? (
        <>
          <div className='movies-container mb-4' data-testid='watch-later-div'>
            {watchLater.watchLaterMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} />
            ))}
          </div>
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => dispatch(removeAllWatchLater())}
          >
            <i className='bi bi-trash3 me-1' />
            Empty List
          </button>
        </>
      ) : (
        <div className='text-white'>
          <p className='fs-5 mb-3'>
            <i className='bi bi-stopwatch fs-3 me-2' />
            You don&apos;t have movies saved to watch later.
          </p>
          <Link to='/' className='btn btn-primary'>
            Go to Home
          </Link>
        </div>
      )}
    </>
  );
}

export default WatchLater;
