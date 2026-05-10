import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL, ENDPOINTS } from '../utils/constants';
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
export async function fetchMovieList(endpoint, page = 1) {
  const response = await tmdb.get(endpoint, {
    params: {
      page
    }
  });
  return extractData(response);
}
export async function searchMovies(query, page = 1) {
  const response = await tmdb.get(ENDPOINTS.SEARCH, {
    params: {
      query,
      page,
      include_adult: false
    }
  });
  return extractData(response);
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
      page
    }
  });
  return extractData(response);
}
