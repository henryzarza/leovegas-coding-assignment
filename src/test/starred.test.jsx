import { screen } from '@testing-library/react';
import { renderWithProviders } from './utils';
import Starred from '../pages/Starred';

describe('Starred page', () => {
  it('there are not starred movies', () => {
    renderWithProviders(<Starred />);

    expect(screen.getByRole('heading', { name: /Starred movies/i })).toBeInTheDocument();
    expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to home/i })).toBeInTheDocument();
  });

  it.todo('when there are starred movies');
});
