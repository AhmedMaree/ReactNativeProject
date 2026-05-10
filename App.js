import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { MovieProvider } from './src/contexts/MovieContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { LightTheme, DarkTheme } from './src/theme';
import { useTheme } from './src/hooks/useTheme';
import RootNavigator from './src/navigation/RootNavigator';
function ThemedApp() {
  const {
    isDarkMode
  } = useTheme();
  const theme = isDarkMode ? DarkTheme : LightTheme;
  return <PaperProvider theme={theme}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <AuthProvider>
        <MovieProvider>
          <FavoritesProvider>
            <RootNavigator />
          </FavoritesProvider>
        </MovieProvider>
      </AuthProvider>
    </PaperProvider>;
}
export default function App() {
  return <GestureHandlerRootView style={{
    flex: 1
  }}>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </GestureHandlerRootView>;
}
