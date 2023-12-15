import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import starredSlice from '../data/starredSlice';
import Movie from '../components/Movie';

function Starred() {
  const { starred } = useSelector((state) => state);
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();

  return (
    <>
      <h2 className='main-title'>Starred movies</h2>
      {starred.starredMovies.length > 0 ? (
        <>
          <div className='movies-container mb-4' data-testid='starred'>
            {starred.starredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} />
            ))}
          </div>
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => dispatch(clearAllStarred())}
          >
            <i className='bi bi-trash3 me-1' />
            Remove all starred
          </button>
        </>
      ) : (
        <div className='text-white'>
          <p className='fs-5 mb-3'>
            <i className='bi bi-star fs-3 me-2' />
            There are no starred movies.
          </p>
          <Link to='/' className='btn btn-primary'>
            Go to Home
          </Link>
        </div>
      )}
    </>
  );
}

export default Starred;
