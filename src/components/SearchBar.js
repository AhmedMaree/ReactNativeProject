import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import { debounce } from '../utils/debounce';
import { SEARCH_DEBOUNCE_MS } from '../utils/constants';
export default function SearchBar({
  value,
  onSearch,
  onChange,
  placeholder = 'Search movies…'
}) {
  const theme = useTheme();
  const debouncedSearch = useRef(debounce(onSearch, SEARCH_DEBOUNCE_MS)).current;
  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);
  function handleChangeText(text) {
    onChange?.(text);
    debouncedSearch(text);
  }
  function handleClear() {
    onChange?.('');
    debouncedSearch.cancel();
    onSearch('');
  }
  return <Searchbar placeholder={placeholder} value={value} onChangeText={handleChangeText} onClearIconPress={handleClear} style={[styles.bar, {
    backgroundColor: theme.colors.surfaceVariant
  }]} inputStyle={{
    color: theme.colors.onSurface
  }} iconColor={theme.colors.onSurfaceVariant} placeholderTextColor={theme.colors.onSurfaceVariant} elevation={0} />;
}
const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 14,
    height: 48
  }
});
