import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useFavorites } from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';
export default function FavoritesScreen({
  navigation
}) {
  const theme = useTheme();
  const {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite
  } = useFavorites();
  const renderItem = useCallback(({
    item
  }) => <MovieCard movie={item} onPress={() => navigation.navigate('MovieDetails', {
    movieId: item.id
  })} isFavorite={isFavorite(item.id)} onFavorite={() => removeFavorite(item.id)} />, [isFavorite, removeFavorite]);
  const keyExtractor = useCallback(item => String(item.id), []);
  return <View style={[styles.container, {
    backgroundColor: theme.colors.background
  }]}>
      <Appbar.Header elevated>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="My Favorites" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <FlatList data={favorites} numColumns={2} keyExtractor={keyExtractor} renderItem={renderItem} contentContainerStyle={[styles.listContent, favorites.length === 0 && styles.emptyList]} ListEmptyComponent={<EmptyState icon="heart-off-outline" title="No favorites yet" description="Tap the heart icon on any movie to save it here." actionLabel="Explore Movies" onAction={() => navigation.navigate('Home')} />} />
      
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
    paddingBottom: 24
  },
  emptyList: {
    flexGrow: 1
  }
});
