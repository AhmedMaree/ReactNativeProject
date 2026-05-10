export const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || '9813ce01a72ca1bd2ae25f091898b1c7';
export const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500';
export const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
export const ENDPOINTS = {
  POPULAR: '/movie/popular',
  TOP_RATED: '/movie/top_rated',
  UPCOMING: '/movie/upcoming',
  NOW_PLAYING: '/movie/now_playing',
  SEARCH: '/search/movie',
  DETAILS: '/movie',
  CREDITS: '/movie',
  SIMILAR: '/movie'
};
export const FILTERS = [{
  key: 'popular',
  label: 'Popular',
  endpoint: ENDPOINTS.POPULAR
}, {
  key: 'top_rated',
  label: 'Top Rated',
  endpoint: ENDPOINTS.TOP_RATED
}, {
  key: 'upcoming',
  label: 'Upcoming',
  endpoint: ENDPOINTS.UPCOMING
}, {
  key: 'now_playing',
  label: 'Now Playing',
  endpoint: ENDPOINTS.NOW_PLAYING
}];
export const STORAGE_KEYS = {
  THEME: '@movie_explorer:theme',
  FAVORITES: uid => `@movie_explorer:favorites:${uid}`,
  MOVIE_CACHE: id => `@movie_explorer:cache:movie:${id}`
};
export const PAGE_SIZE = 20;
export const SEARCH_DEBOUNCE_MS = 300;
