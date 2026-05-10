import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
const ACCENT = '#E50914';
export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: ACCENT,
    secondary: '#F5A623',
    background: '#F6F6F6',
    surface: '#FFFFFF',
    onSurface: '#1C1C1E',
    surfaceVariant: '#EFEFEF',
    onSurfaceVariant: '#636366',
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level2: '#FFFFFF'
    }
  }
};
export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: ACCENT,
    secondary: '#F5A623',
    background: '#0D0D0D',
    surface: '#1C1C1E',
    onSurface: '#F2F2F7',
    surfaceVariant: '#2C2C2E',
    onSurfaceVariant: '#AEAEB2',
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level2: '#2C2C2E'
    }
  }
};
