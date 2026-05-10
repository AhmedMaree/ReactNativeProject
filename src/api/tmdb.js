import axios from 'axios';
import { ANIME_GENRE_ID, TMDB_API_KEY, TMDB_BASE_URL, ENDPOINTS } from '../utils/constants';
import { getItem, setItem } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';
const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
  params: {
    api_key: TMDB_API_KEY
  }
});
function extractData(response) {
  return response.data;
}
function today() {
  return new Date().toISOString().slice(0, 10);
}
function buildAnimeDiscoverParams(filter, page) {
  const params = {
    page,
    include_adult: false,
    include_video: false,
    sort_by: filter.sortBy,
    with_genres: ANIME_GENRE_ID,
    with_original_language: 'ja'
  };
  if (filter.minVotes) {
    params['vote_count.gte'] = filter.minVotes;
  }
  if (filter.releaseFrom === 'today') {
    params['primary_release_date.gte'] = today();
  }
  if (filter.releaseTo === 'today') {
    params['primary_release_date.lte'] = today();
  }
  return params;
}
function isAnimeMovie(movie) {
  return !movie.adult && movie.genre_ids?.includes(ANIME_GENRE_ID) && movie.original_language === 'ja';
}
function filterSafeMovies(results = []) {
  return results.filter(isAnimeMovie);
}
function sanitizeMovieList(data) {
  return {
    ...data,
    results: filterSafeMovies(data.results)
  };
}
export async function fetchMovieList(filter, page = 1) {
  const response = await tmdb.get(ENDPOINTS.DISCOVER, {
    params: buildAnimeDiscoverParams(filter, page)
  });
  return sanitizeMovieList(extractData(response));
}
export async function searchMovies(query, page = 1) {
  const response = await tmdb.get(ENDPOINTS.SEARCH, {
    params: {
      query,
      page,
      include_adult: false,
      with_genres: ANIME_GENRE_ID
    }
  });
  return sanitizeMovieList(extractData(response));
}
export async function fetchMovieDetails(movieId) {
  const cacheKey = STORAGE_KEYS.MOVIE_CACHE(movieId);
  const cached = await getItem(cacheKey);
  if (cached) return cached;
  const response = await tmdb.get(`${ENDPOINTS.DETAILS}/${movieId}`, {
    params: {
      append_to_response: 'genres'
    }
  });
  const data = extractData(response);
  setItem(cacheKey, data).catch(() => {});
  return data;
}
export async function fetchMovieCredits(movieId) {
  const response = await tmdb.get(`${ENDPOINTS.CREDITS}/${movieId}/credits`);
  return extractData(response);
}
export async function fetchSimilarMovies(movieId, page = 1) {
  const response = await tmdb.get(`${ENDPOINTS.SIMILAR}/${movieId}/similar`, {
    params: {
      page,
      include_adult: false
    }
  });
  return sanitizeMovieList(extractData(response));
}
