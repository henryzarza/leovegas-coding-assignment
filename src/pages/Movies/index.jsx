import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../../constants';
import Movie from '../../components/Movie';
import moviesSlice, { fetchMovies } from '../../data/moviesSlice';
import { useElementInView } from '../../utils';
import './styles.scss';

function Movies() {
  const refIntersection = useRef();
  const isIntersecting = useElementInView(refIntersection.current, '800px');
  const { movies } = useSelector((state) => state);
  const { addMovies } = moviesSlice.actions;
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    dispatch(
      fetchMovies(searchQuery ? `${ENDPOINT_SEARCH}&query=${searchQuery}` : ENDPOINT_DISCOVER)
    );
  }, []);

  useEffect(() => {
    if (isIntersecting && movies.movies.page < movies.movies.total_pages) {
      const query = searchQuery ? `${ENDPOINT_SEARCH}&query=${searchQuery}` : ENDPOINT_DISCOVER;
      fetch(`${query}&page=${movies.movies.page + 1}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.page && data.results) {
            dispatch(addMovies({ page: data.page, results: data.results }));
          }
        });
    }
  }, [isIntersecting]);

  if (!movies.fetchStatus || movies.fetchMovies === 'loading') {
    return (
      <div className='d-flex flex-column'>
        <div className='loader mb-3' />
        <h6 className='text-white fs-3'>Loading</h6>
      </div>
    );
  }

  if (movies.fetchMovies === 'error') {
    return (
      <p className='fs-5 mb-3 text-white'>
        <i className='bi bi-exclamation-triangle fs-3 me-2' />
        There was an error processing the request
      </p>
    );
  }

  return (
    <>
      {movies.movies.results?.length > 0 ? (
        <div data-testid='movies' className='movies-container'>
          {movies.movies.results.map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <p className='fs-5 mb-3 text-white'>
          <i className='bi bi-film fs-3 me-2' />
          There are no movies to show.
        </p>
      )}
      <div ref={refIntersection} />
    </>
  );
}

export default Movies;
