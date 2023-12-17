import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test/utils';
import './test/__mocks__/intersectionObserverMock';
import App from './App';

describe('App', () => {
  it('renders nav properly', () => {
    renderWithProviders(<App />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('nav-starred')).toBeInTheDocument();
    expect(screen.getByTestId('nav-watch-later')).toBeInTheDocument();
    expect(screen.getByTestId('nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('search-movies')).toBeInTheDocument();
  });

  it('search for movies', async () => {
    renderWithProviders(<App />);
    await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');
    await waitFor(() => {
      expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument();
    });
    const watchTrailerBtn = screen.getAllByRole('button', { name: 'Watch Trailer' });
    expect(watchTrailerBtn[0]).toBeInTheDocument();
    await userEvent.click(watchTrailerBtn[0]);
    await waitFor(() => {
      expect(screen.getByTestId('youtube-player')).toBeInTheDocument();
    });
  });

  it('renders watch later component', async () => {
    renderWithProviders(<App />);
    await userEvent.click(screen.getByTestId('nav-watch-later'));
    expect(screen.getByText("You don't have movies saved to watch later.")).toBeInTheDocument();
  });

  it('renders starred component', async () => {
    renderWithProviders(<App />);
    await userEvent.click(screen.getByTestId('nav-starred'));
    expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument();
  });
});
