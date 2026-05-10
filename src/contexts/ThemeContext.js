import React, { createContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { getItem, setItem } from '../utils/storage';
const TOGGLE_THEME = 'TOGGLE_THEME';
const SET_THEME = 'SET_THEME';
function themeReducer(state, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      };
    case SET_THEME:
      return {
        ...state,
        isDarkMode: action.payload
      };
    default:
      return state;
  }
}
export const ThemeContext = createContext(null);
export function ThemeProvider({
  children
}) {
  const [state, dispatch] = useReducer(themeReducer, {
    isDarkMode: false
  });
  useEffect(() => {
    (async () => {
      const saved = await getItem(STORAGE_KEYS.THEME);
      if (saved !== null) {
        dispatch({
          type: SET_THEME,
          payload: saved
        });
      }
    })();
  }, []);
  useEffect(() => {
    setItem(STORAGE_KEYS.THEME, state.isDarkMode);
  }, [state.isDarkMode]);
  function toggleTheme() {
    dispatch({
      type: TOGGLE_THEME
    });
  }
  return <ThemeContext.Provider value={{
    isDarkMode: state.isDarkMode,
    toggleTheme
  }}>
      {children}
    </ThemeContext.Provider>;
}
