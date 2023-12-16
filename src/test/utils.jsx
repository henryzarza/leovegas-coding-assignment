import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import moviesSlice from '../data/moviesSlice';
import starredSlice from '../data/starredSlice';
import watchLaterSlice from '../data/watchLaterSlice';
import AppContext from '../contexts';

// eslint-disable-next-line import/prefer-default-export
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        movies: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }) {
    // eslint-disable-next-line no-undef
    const mockWatchTrailerFn = jest.fn();

    return (
      <Provider store={store}>
        <AppContext.Provider value={mockWatchTrailerFn}>
          <BrowserRouter>{children}</BrowserRouter>
        </AppContext.Provider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}