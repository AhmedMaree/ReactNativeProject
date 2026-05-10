import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import Loading from '../components/Loading';
export default function RootNavigator() {
  const {
    isAuthenticated,
    isLoading
  } = useAuth();
  if (isLoading) {
    return <Loading message="Starting up…" />;
  }
  return <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>;
}
