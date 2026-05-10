import React, { createContext, useReducer, useEffect } from 'react';
import { registerWithEmail, loginWithEmail, logoutUser, resetPassword, subscribeToAuthChanges } from '../api/firebase';
const AUTH_LOADING = 'AUTH_LOADING';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR';
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case AUTH_LOGOUT:
      return {
        ...initialState,
        isLoading: false
      };
    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
export const AuthContext = createContext(null);
function serializeUser(firebaseUser) {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || null,
    photoURL: firebaseUser.photoURL || null
  };
}
function friendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'That email address is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.'
  };
  return map[code] || 'An unexpected error occurred. Please try again.';
}
export function AuthProvider({
  children
}) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(firebaseUser => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: serializeUser(firebaseUser)
      });
    });
    return unsubscribe;
  }, []);
  async function register(email, password) {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const {
        user
      } = await registerWithEmail(email, password);
      dispatch({
        type: AUTH_SUCCESS,
        payload: serializeUser(user)
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: friendlyError(err.code)
      });
    }
  }
  async function login(email, password) {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      const {
        user
      } = await loginWithEmail(email, password);
      dispatch({
        type: AUTH_SUCCESS,
        payload: serializeUser(user)
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: friendlyError(err.code)
      });
    }
  }
  async function logout() {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      await logoutUser();
      dispatch({
        type: AUTH_LOGOUT
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: friendlyError(err.code)
      });
    }
  }
  async function sendPasswordReset(email) {
    dispatch({
      type: AUTH_LOADING
    });
    try {
      await resetPassword(email);
      dispatch({
        type: AUTH_SUCCESS,
        payload: state.user
      });
      return {
        success: true
      };
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: friendlyError(err.code)
      });
      return {
        success: false
      };
    }
  }
  function clearError() {
    dispatch({
      type: AUTH_CLEAR_ERROR
    });
  }
  return <AuthContext.Provider value={{
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    register,
    login,
    logout,
    sendPasswordReset,
    clearError
  }}>
      
      {children}
    </AuthContext.Provider>;
}
