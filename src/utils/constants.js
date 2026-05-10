export const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || '9813ce01a72ca1bd2ae25f091898b1c7';
export const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500';
export const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
export const SHOW_REMOTE_MOVIE_IMAGES = process.env.EXPO_PUBLIC_SHOW_REMOTE_MOVIE_IMAGES === 'true';
export const ENDPOINTS = {
  DISCOVER: '/discover/movie',
  SEARCH: '/search/movie',
  DETAILS: '/movie',
  CREDITS: '/movie',
  SIMILAR: '/movie'
};
export const ANIME_GENRE_ID = 16;
export const FILTERS = [{
  key: 'popular',
  label: 'Popular',
  sortBy: 'popularity.desc'
}, {
  key: 'top_rated',
  label: 'Top Rated',
  sortBy: 'vote_average.desc',
  minVotes: 100
}, {
  key: 'upcoming',
  label: 'Upcoming',
  sortBy: 'primary_release_date.asc',
  releaseFrom: 'today'
}, {
  key: 'now_playing',
  label: 'Now Playing',
  sortBy: 'primary_release_date.desc',
  releaseTo: 'today'
}];
export const STORAGE_KEYS = {
  THEME: '@movie_explorer:theme',
  FAVORITES: uid => `@movie_explorer:favorites:${uid}`,
  MOVIE_CACHE: id => `@movie_explorer:cache:movie:${id}`
};
export const PAGE_SIZE = 20;
export const SEARCH_DEBOUNCE_MS = 300;
