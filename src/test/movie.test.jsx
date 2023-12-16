import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Movie from '../components/Movie';
import { renderWithProviders } from './utils';
import { MOCK_MOVIES } from './__mocks__/movies';

describe('Movie Component', () => {
  it('when user clicks star the movie should be added to starred list', async () => {
    renderWithProviders(<Movie movie={MOCK_MOVIES[0]} />);

    const addToStarBtn = screen.getByTestId('star-movie');

    expect(screen.getByAltText(`${MOCK_MOVIES[0].title} poster`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: MOCK_MOVIES[0].title })).toBeInTheDocument();
    expect(addToStarBtn).toBeInTheDocument();

    await userEvent.click(addToStarBtn);
    await waitFor(() => expect(addToStarBtn.classList).toContain('active'));
  });

  it('when user clicks watch later button the movie should be added to watch later list', async () => {
    renderWithProviders(<Movie movie={MOCK_MOVIES[1]} />);

    const addToWatchLaterBtn = screen.getByTestId('watch-later');

    expect(screen.getByAltText(`${MOCK_MOVIES[1].title} poster`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: MOCK_MOVIES[1].title })).toBeInTheDocument();
    expect(addToWatchLaterBtn).toBeInTheDocument();

    await userEvent.click(addToWatchLaterBtn);
    await waitFor(() => expect(addToWatchLaterBtn.classList).toContain('active'));
  });
});
