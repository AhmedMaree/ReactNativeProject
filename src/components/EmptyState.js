import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function EmptyState({
  icon = 'movie-open-off',
  title,
  description,
  actionLabel,
  onAction
}) {
  const theme = useTheme();
  return <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={80} color={theme.colors.onSurfaceVariant} style={styles.icon} />
      
      <Text variant="headlineSmall" style={[styles.title, {
      color: theme.colors.onSurface
    }]}>
        
        {title}
      </Text>
      {description ? <Text variant="bodyMedium" style={[styles.description, {
      color: theme.colors.onSurfaceVariant
    }]}>
        
          {description}
        </Text> : null}
      {actionLabel && onAction ? <Button mode="contained" onPress={onAction} style={styles.button} contentStyle={styles.buttonContent}>
        
          {actionLabel}
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
    marginBottom: 16,
    opacity: 0.6
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700'
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24
  },
  button: {
    borderRadius: 24
  },
  buttonContent: {
    paddingVertical: 4,
    paddingHorizontal: 12
  }
});
