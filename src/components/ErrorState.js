import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ErrorState({
  message,
  onRetry
}) {
  const theme = useTheme();
  return <View style={styles.container}>
      <MaterialCommunityIcons name="alert-circle-outline" size={72} color={theme.colors.error} style={styles.icon} />
      
      <Text variant="headlineSmall" style={[styles.title, {
      color: theme.colors.onSurface
    }]}>
        
        Something went wrong
      </Text>
      {message ? <Text variant="bodyMedium" style={[styles.description, {
      color: theme.colors.onSurfaceVariant
    }]}>
        
          {message}
        </Text> : null}
      {onRetry ? <Button mode="contained" onPress={onRetry} style={styles.button} contentStyle={styles.buttonContent} icon="refresh">
        
          Try Again
        </Button> : null}
    </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48
  },
  icon: {
    marginBottom: 16
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700'
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    opacity: 0.8
  },
  button: {
    borderRadius: 24
  },
  buttonContent: {
    paddingVertical: 4,
    paddingHorizontal: 12
  }
});
