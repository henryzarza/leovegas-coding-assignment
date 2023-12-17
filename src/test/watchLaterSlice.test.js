import watchLaterSlice from '../data/watchLaterSlice';
import { MOCK_MOVIES } from './__mocks__/movies';

describe('watchLaterSlice test', () => {
  const state = { watchLaterMovies: [] };

  it('should set initial state', () => {
    const initialState = state;
    const action = { type: '' };
    const result = watchLaterSlice.reducer(initialState, action);
    expect(result).toEqual({ watchLaterMovies: [] });
  });

  it('should add movie to watch later', () => {
    const initialState = { ...state, watchLaterMovies: [] };
    const action = watchLaterSlice.actions.addToWatchLater(MOCK_MOVIES[0]);
    const result = watchLaterSlice.reducer(initialState, action);
    expect(result.watchLaterMovies[0]).toBe(MOCK_MOVIES[0]);
  });

  it('should remove movie from watch later', () => {
    const initialState = { ...state, watchLaterMovies: MOCK_MOVIES };
    const action = watchLaterSlice.actions.removeFromWatchLater(MOCK_MOVIES[0].id);
    const result = watchLaterSlice.reducer(initialState, action);
    expect(result.watchLaterMovies[0]).toBe(MOCK_MOVIES[1]);
  });

  it('should remove all movies', () => {
    const initialState = { ...state, watchLaterMovies: MOCK_MOVIES };
    const action = watchLaterSlice.actions.removeAllWatchLater(state);
    const result = watchLaterSlice.reducer(initialState, action);
    expect(Object.keys(result.watchLaterMovies).length).toEqual(0);
  });
});
