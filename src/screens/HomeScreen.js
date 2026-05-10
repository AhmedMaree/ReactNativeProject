import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useMovies } from '../hooks/useMovies';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
const NUM_COLUMNS = 2;
const {
  width
} = Dimensions.get('window');
export default function HomeScreen({
  navigation
}) {
  const theme = useTheme();
  const {
    movies,
    selectedFilter,
    searchQuery,
    isLoading,
    isLoadingMore,
    error,
    fetchMovies,
    loadMore,
    setFilter,
    setSearchQuery,
    resetError
  } = useMovies();
  const {
    isFavorite,
    addFavorite,
    removeFavorite
  } = useFavorites();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    fetchMovies(searchQuery, selectedFilter);
  }, [selectedFilter]);
  function handleSearch(query) {
    fetchMovies(query, selectedFilter);
  }
  function handleFilterChange(filter) {
    setLocalQuery('');
    setSearchQuery('');
    setFilter(filter);
  }
  async function handleRefresh() {
    setRefreshing(true);
    await fetchMovies(searchQuery, selectedFilter);
    setRefreshing(false);
  }
  function handleEndReached() {
    if (!isLoading && !isLoadingMore) loadMore();
  }
  function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }
  const renderItem = useCallback(({
    item
  }) => <MovieCard movie={item} onPress={() => navigation.navigate('MovieDetails', {
    movieId: item.id
  })} isFavorite={isFavorite(item.id)} onFavorite={() => toggleFavorite(item)} />, [isFavorite]);
  const keyExtractor = useCallback(item => String(item.id), []);
  const ListFooter = isLoadingMore ? <Loading message="Loading more…" overlay={false} /> : null;
  if (isLoading && movies.length === 0) {
    return <Loading message="Fetching movies…" />;
  }
  if (error && movies.length === 0) {
    return <ErrorState message={error} onRetry={() => {
      resetError();
      fetchMovies(searchQuery, selectedFilter);
    }} />;
  }
  return <View style={[styles.container, {
    backgroundColor: theme.colors.background
  }]}>
      <Appbar.Header elevated>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Movie Explorer" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      {}
      <SearchBar value={localQuery} onChange={setLocalQuery} onSearch={handleSearch} />
      

      {}
      <FilterChips selected={selectedFilter} onSelect={handleFilterChange} />

      {}
      <FlatList data={movies} numColumns={NUM_COLUMNS} keyExtractor={keyExtractor} renderItem={renderItem} contentContainerStyle={styles.listContent} onEndReached={handleEndReached} onEndReachedThreshold={0.4} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={theme.colors.primary} colors={[theme.colors.primary]} />} ListFooterComponent={ListFooter} ListEmptyComponent={<EmptyState icon="movie-search-outline" title={searchQuery ? 'No results found' : 'No movies available'} description={searchQuery ? `We couldn't find anything for "${searchQuery}". Try a different search.` : 'Pull down to refresh.'} actionLabel={searchQuery ? 'Clear Search' : undefined} onAction={() => {
      setLocalQuery('');
      handleSearch('');
    }} />} />
      
    </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appbarTitle: {
    fontWeight: '800'
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 24,
    flexGrow: 1
  }
});
