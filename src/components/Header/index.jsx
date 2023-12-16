import { useCallback } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { debounce } from '../../utils';
import './styles.scss';

function Header({ searchMovies }) {
  const { starredMovies } = useSelector((state) => state.starred);
  const [searchParams] = useSearchParams();

  const debouncedHandleSearch = useCallback(
    debounce((e) => {
      // TODO: not sure about this behavior, needs to be discuss
      if (e.target.value === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      searchMovies(e.target.value);
    }, 300),
    []
  );

  return (
    <header className='header'>
      <div className='container d-flex'>
        <NavLink to='/' className='btn btn-outline-primary btn-nav-link' data-testid='home'>
          <i className='bi bi-film me-2' />
          Movieland
        </NavLink>

        <div className='input-search-container'>
          <input
            type='search'
            data-testid='search-movies'
            onInput={debouncedHandleSearch}
            className='form-control'
            placeholder='Search movies...'
            aria-label='Search movies'
            // TODO: there is a known issue when the user goes to a page different than the home page, the input value is not being cleared.
            defaultValue={searchParams.get('search')}
          />
        </div>

        <nav className='navbar-container'>
          <NavLink
            to='/starred'
            data-testid='nav-starred'
            className='btn btn-outline-primary btn-nav-link'
          >
            <i className='bi bi-star-fill me-1' /> Starred
            {!!starredMovies.length && <sup className='star-number'>{starredMovies.length}</sup>}
          </NavLink>
          <NavLink to='/watch-later' className='btn btn-outline-primary btn-nav-link'>
            <i className='bi bi-stopwatch-fill me-1' /> Watch Later
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
