import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { FILTERS } from '../utils/constants';
export default function FilterChips({
  selected,
  onSelect
}) {
  const theme = useTheme();
  return <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        
        {FILTERS.map(filter => {
        const active = selected?.key === filter.key;
        return <Chip key={filter.key} selected={active} onPress={() => onSelect(filter)} style={[styles.chip, active ? {
          backgroundColor: theme.colors.primary
        } : {
          backgroundColor: theme.colors.surfaceVariant
        }]} textStyle={[styles.chipText, {
          color: active ? '#ffffff' : theme.colors.onSurfaceVariant
        }]} compact elevated={active}>
              
              {filter.label}
            </Chip>;
      })}
      </ScrollView>
    </View>;
}
const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8
  },
  row: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center'
  },
  chip: {
    borderRadius: 20
  },
  chipText: {
    fontWeight: '600',
    fontSize: 13
  }
});
