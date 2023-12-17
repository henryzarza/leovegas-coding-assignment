import { fetchMovies } from '../data/moviesSlice';
import { MOCK_MOVIES } from './__mocks__/movies';

describe('MovieSlice', () => {
  it('should set loading true while action is pending', () => {
    const action = { type: fetchMovies.pending };
    expect(action).toEqual({ type: fetchMovies.pending });
  });

  it('should return payload when action is fulfilled', () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: MOCK_MOVIES,
    };
    expect(action.payload).toBeTruthy();
  });

  it('should set error when action is rejected', () => {
    const action = { type: fetchMovies.rejected };
    expect(action).toEqual({ type: fetchMovies.rejected });
  });
});
