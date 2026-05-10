import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { getItem, setItem } from '../utils/storage';
import { AuthContext } from './AuthContext';
const LOAD_FAVORITES = 'LOAD_FAVORITES';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
const CLEAR_FAVORITES = 'CLEAR_FAVORITES';
function favoritesReducer(state, action) {
  switch (action.type) {
    case LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    case ADD_FAVORITE:
      if (state.favorites.some(m => m.id === action.payload.id)) return state;
      return {
        ...state,
        favorites: [action.payload, ...state.favorites]
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(m => m.id !== action.payload)
      };
    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: []
      };
    default:
      return state;
  }
}
export const FavoritesContext = createContext(null);
export function FavoritesProvider({
  children
}) {
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: []
  });
  const {
    user
  } = useContext(AuthContext);
  useEffect(() => {
    if (user?.uid) {
      loadFavorites(user.uid);
    } else {
      dispatch({
        type: CLEAR_FAVORITES
      });
    }
  }, [user?.uid]);
  useEffect(() => {
    if (user?.uid) {
      setItem(STORAGE_KEYS.FAVORITES(user.uid), state.favorites).catch(() => {});
    }
  }, [state.favorites, user?.uid]);
  async function loadFavorites(uid) {
    const stored = await getItem(STORAGE_KEYS.FAVORITES(uid));
    dispatch({
      type: LOAD_FAVORITES,
      payload: Array.isArray(stored) ? stored : []
    });
  }
  function addFavorite(movie) {
    dispatch({
      type: ADD_FAVORITE,
      payload: movie
    });
  }
  function removeFavorite(movieId) {
    dispatch({
      type: REMOVE_FAVORITE,
      payload: movieId
    });
  }
  function isFavorite(movieId) {
    return state.favorites.some(m => m.id === movieId);
  }
  return <FavoritesContext.Provider value={{
    favorites: state.favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }}>
      
      {children}
    </FavoritesContext.Provider>;
}
