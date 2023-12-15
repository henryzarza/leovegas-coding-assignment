import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../../constants';
import Movie from '../../components/Movie';
import { fetchMovies } from '../../data/moviesSlice';
import './styles.scss';

function Movies({ viewTrailer }) {
  const { movies } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    dispatch(
      fetchMovies(searchQuery ? `${ENDPOINT_SEARCH}&query=${searchQuery}` : ENDPOINT_DISCOVER)
    );
  }, []);

  return (
    <div data-testid='movies' className='movies-container'>
      {movies.movies.results?.map((movie) => (
        <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
      ))}
    </div>
  );
}

export default Movies;
