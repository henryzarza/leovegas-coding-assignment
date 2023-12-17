import starredSlice from '../data/starredSlice';
import { MOCK_MOVIES } from './__mocks__/movies';

describe('starredSlice', () => {
  const state = { starredMovies: [] };

  it('should set an initial state', () => {
    const initialState = state;
    const action = { type: '' };
    const result = starredSlice.reducer(initialState, action);
    expect(result).toEqual({ starredMovies: [] });
  });

  it('should add movie to starred', () => {
    const initialState = { ...state, starredMovies: [] };
    const action = starredSlice.actions.starMovie(MOCK_MOVIES[0]);
    const result = starredSlice.reducer(initialState, action);
    expect(result.starredMovies[0]).toBe(MOCK_MOVIES[0]);
  });

  it('should remove movie from starred', () => {
    const initialState = { ...state, starredMovies: MOCK_MOVIES };
    const action = starredSlice.actions.unstarMovie(MOCK_MOVIES[0].id);
    const result = starredSlice.reducer(initialState, action);
    expect(result.starredMovies[0]).toBe(MOCK_MOVIES[1]);
  });

  it('should remove all movies', () => {
    const initialState = { ...state, starredMovies: MOCK_MOVIES };
    const action = starredSlice.actions.clearAllStarred(state);
    const result = starredSlice.reducer(initialState, action);
    expect(Object.keys(result.starredMovies).length).toEqual(0);
  });
});
