import React, { createContext, useReducer, useCallback } from 'react';
import { fetchMovieList, searchMovies as apiSearch } from '../api/tmdb';
import { FILTERS, PAGE_SIZE } from '../utils/constants';
const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_MORE = 'FETCH_MORE';
const FETCH_ERROR = 'FETCH_ERROR';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
const SET_FILTER = 'SET_FILTER';
const CLEAR_MOVIES = 'CLEAR_MOVIES';
const RESET_ERROR = 'RESET_ERROR';
const initialState = {
  movies: [],
  selectedFilter: FILTERS[0],
  searchQuery: '',
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  isLoadingMore: false,
  error: null
};
function movieReducer(state, action) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isLoading: action.payload?.more ? state.isLoading : true,
        isLoadingMore: action.payload?.more ? true : false,
        error: null
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        movies: action.payload.results,
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages,
        isLoading: false,
        isLoadingMore: false
      };
    case FETCH_MORE:
      return {
        ...state,
        movies: [...state.movies, ...action.payload.results],
        currentPage: action.payload.page,
        totalPages: action.payload.total_pages,
        isLoading: false,
        isLoadingMore: false
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoadingMore: false,
        error: action.payload
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        movies: [],
        currentPage: 1
      };
    case SET_FILTER:
      return {
        ...state,
        selectedFilter: action.payload,
        searchQuery: '',
        movies: [],
        currentPage: 1
      };
    case CLEAR_MOVIES:
      return {
        ...initialState
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
export const MovieContext = createContext(null);
export function MovieProvider({
  children
}) {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const fetchMovies = useCallback(async (query, filter, page = 1) => {
    dispatch({
      type: FETCH_START
    });
    try {
      let data;
      if (query && query.trim()) {
        data = await apiSearch(query.trim(), page);
      } else {
        data = await fetchMovieList(filter.endpoint, page);
      }
      dispatch({
        type: FETCH_SUCCESS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: FETCH_ERROR,
        payload: err.message || 'Failed to load movies.'
      });
    }
  }, []);
  const loadMore = useCallback(async () => {
    const {
      currentPage,
      totalPages,
      isLoadingMore,
      isLoading,
      searchQuery,
      selectedFilter
    } = state;
    if (isLoading || isLoadingMore || currentPage >= totalPages) return;
    const nextPage = currentPage + 1;
    dispatch({
      type: FETCH_START,
      payload: {
        more: true
      }
    });
    try {
      let data;
      if (searchQuery.trim()) {
        data = await apiSearch(searchQuery.trim(), nextPage);
      } else {
        data = await fetchMovieList(selectedFilter.endpoint, nextPage);
      }
      dispatch({
        type: FETCH_MORE,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: FETCH_ERROR,
        payload: err.message || 'Failed to load more movies.'
      });
    }
  }, [state]);
  function setSearchQuery(query) {
    dispatch({
      type: SET_SEARCH_QUERY,
      payload: query
    });
  }
  function setFilter(filter) {
    dispatch({
      type: SET_FILTER,
      payload: filter
    });
  }
  function clearMovies() {
    dispatch({
      type: CLEAR_MOVIES
    });
  }
  function resetError() {
    dispatch({
      type: RESET_ERROR
    });
  }
  return <MovieContext.Provider value={{
    movies: state.movies,
    selectedFilter: state.selectedFilter,
    searchQuery: state.searchQuery,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    isLoading: state.isLoading,
    isLoadingMore: state.isLoadingMore,
    error: state.error,
    fetchMovies,
    loadMore,
    setSearchQuery,
    setFilter,
    clearMovies,
    resetError
  }}>
      
      {children}
    </MovieContext.Provider>;
}
