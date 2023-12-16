import { screen } from '@testing-library/react';
import { renderWithProviders } from './utils';
import WatchLater from '../pages/WatchLater';

describe('WatchLater page', () => {
  it('there are not movies to watch later', () => {
    renderWithProviders(<WatchLater />);

    expect(screen.getByRole('heading', { name: /Watch Later/i })).toBeInTheDocument();
    expect(screen.getByText(/movies saved to watch later/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to home/i })).toBeInTheDocument();
  });

  it.todo('when there are movies to watch later');
});
