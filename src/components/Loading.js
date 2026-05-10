import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
export default function Loading({
  message,
  overlay = false
}) {
  const theme = useTheme();
  return <View style={[styles.container, overlay && {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)'
  }, !overlay && {
    backgroundColor: theme.colors.background
  }]}>
      
      <ActivityIndicator size="large" animating color={theme.colors.primary} />
      {message ? <Text variant="bodyMedium" style={[styles.message, {
      color: theme.colors.onSurface
    }]}>
          {message}
        </Text> : null}
    </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  message: {
    marginTop: 8,
    textAlign: 'center'
  }
});
