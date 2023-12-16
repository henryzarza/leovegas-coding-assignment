import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
  },
  reducers: {
    addMovies: (state, action) => {
      state.movies = {
        ...state.movies,
        page: action.payload.page,
        results: [...state.movies.results, ...action.payload.results],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.fetchStatus = 'success';
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error';
      });
  },
});

export default moviesSlice;
