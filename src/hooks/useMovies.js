import { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';
export function useMovies() {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error('useMovies must be used within a MovieProvider');
  return ctx;
}
export default useMovies;
