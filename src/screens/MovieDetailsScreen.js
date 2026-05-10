import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Chip, Button, Surface, Appbar, useTheme, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from '../api/tmdb';
import { TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_BASE_URL } from '../utils/constants';
import { useFavorites } from '../hooks/useFavorites';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
const {
  width
} = Dimensions.get('window');
const BACKDROP_HEIGHT = width * 0.6;
const POSTER_WIDTH = 100;
const CAST_IMG_SIZE = 60;
export default function MovieDetailsScreen({
  route,
  navigation
}) {
  const {
    movieId
  } = route.params;
  const theme = useTheme();
  const {
    isFavorite,
    addFavorite,
    removeFavorite
  } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const favorited = movie ? isFavorite(movie.id) : false;
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [details, credits, similarMovies] = await Promise.all([fetchMovieDetails(movieId), fetchMovieCredits(movieId), fetchSimilarMovies(movieId)]);
      setMovie(details);
      setCast(credits.cast?.slice(0, 15) || []);
      setSimilar(similarMovies.results?.slice(0, 10) || []);
    } catch (err) {
      setError(err.message || 'Failed to load movie details.');
    } finally {
      setLoading(false);
    }
  }, [movieId]);
  useEffect(() => {
    load();
  }, [load]);
  function toggleFavorite() {
    if (!movie) return;
    if (favorited) removeFavorite(movie.id);else addFavorite(movie);
  }
  function renderCastItem({
    item
  }) {
    const imgUri = item.profile_path ? {
      uri: `${TMDB_IMAGE_BASE_URL}${item.profile_path}`
    } : null;
    return <View style={styles.castItem}>
        <Surface style={styles.castImgWrap} elevation={2}>
          {imgUri ? <Image source={imgUri} style={styles.castImg} /> : <View style={[styles.castImg, {
          backgroundColor: theme.colors.surfaceVariant,
          justifyContent: 'center',
          alignItems: 'center'
        }]}>
              <MaterialCommunityIcons name="account" size={30} color={theme.colors.onSurfaceVariant} />
            </View>}
        </Surface>
        <Text variant="labelSmall" numberOfLines={2} style={[styles.castName, {
        color: theme.colors.onSurface
      }]}>
          {item.name}
        </Text>
        <Text variant="labelSmall" numberOfLines={1} style={{
        color: theme.colors.onSurfaceVariant,
        fontSize: 10,
        textAlign: 'center'
      }}>
          {item.character}
        </Text>
      </View>;
  }
  function renderSimilarItem({
    item
  }) {
    const posterUri = item.poster_path ? {
      uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
    } : null;
    return <TouchableOpacity style={styles.similarCard} onPress={() => navigation.push('MovieDetails', {
      movieId: item.id
    })} activeOpacity={0.85}>
        
        <Surface style={styles.similarSurface} elevation={2}>
          {posterUri ? <Image source={posterUri} style={styles.similarPoster} /> : <View style={[styles.similarPoster, {
          backgroundColor: theme.colors.surfaceVariant
        }]} />}
          <Text variant="labelSmall" numberOfLines={2} style={[styles.similarTitle, {
          color: theme.colors.onSurface
        }]}>
            {item.title}
          </Text>
        </Surface>
      </TouchableOpacity>;
  }
  if (loading) return <Loading message="Loading details…" />;
  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!movie) return null;
  const backdropUri = movie.backdrop_path ? {
    uri: `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`
  } : null;
  const posterUri = movie.poster_path ? {
    uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
  } : null;
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  return <View style={[styles.container, {
    backgroundColor: theme.colors.background
  }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {}
        <View style={styles.backdropWrap}>
          {backdropUri ? <Image source={backdropUri} style={styles.backdrop} /> : <View style={[styles.backdrop, {
          backgroundColor: theme.colors.surfaceVariant
        }]} />}
          <LinearGradient colors={['transparent', theme.colors.background]} style={styles.backdropGradient} />
          
          <Appbar.BackAction onPress={() => navigation.goBack()} style={[styles.backBtn, {
          backgroundColor: 'rgba(0,0,0,0.55)'
        }]} color="#ffffff" />
          
        </View>

        {}
        <View style={styles.heroRow}>
          <Surface style={styles.posterWrap} elevation={4}>
            {posterUri ? <Image source={posterUri} style={styles.poster} /> : <View style={[styles.poster, {
            backgroundColor: theme.colors.surfaceVariant
          }]} />}
          </Surface>

          <View style={styles.primaryInfo}>
            <Text variant="titleLarge" style={[styles.title, {
            color: theme.colors.onSurface
          }]} numberOfLines={4}>
              {movie.title}
            </Text>
            {movie.tagline ? <Text variant="bodySmall" style={{
            color: theme.colors.onSurfaceVariant,
            fontStyle: 'italic',
            marginBottom: 8
          }}>
                "{movie.tagline}"
              </Text> : null}

            {}
            <View style={styles.ratingRow}>
              <MaterialCommunityIcons name="star" size={16} color="#F5A623" />
              <Text variant="labelLarge" style={{
              color: theme.colors.onSurface,
              marginLeft: 4
            }}>
                {movie.vote_average?.toFixed(1)} / 10
              </Text>
            </View>

            {runtime ? <Text variant="labelMedium" style={{
            color: theme.colors.onSurfaceVariant
          }}>
                ⏱ {runtime}
              </Text> : null}
            {movie.release_date ? <Text variant="labelMedium" style={{
            color: theme.colors.onSurfaceVariant
          }}>
                📅 {movie.release_date.slice(0, 4)}
              </Text> : null}
          </View>
        </View>

        <View style={styles.body}>
          {}
          {movie.genres?.length > 0 && <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreRow}>
              {movie.genres.map(g => <Chip key={g.id} style={styles.genreChip} compact>
                  {g.name}
                </Chip>)}
            </ScrollView>}

          {}
          <Button mode={favorited ? 'contained' : 'outlined'} icon={favorited ? 'heart' : 'heart-outline'} onPress={toggleFavorite} style={styles.favBtn} contentStyle={styles.favBtnContent}>
            
            {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>

          {}
          <Text variant="titleMedium" style={[styles.sectionTitle, {
          color: theme.colors.onSurface
        }]}>
            Overview
          </Text>
          <Text variant="bodyMedium" style={[styles.overview, {
          color: theme.colors.onSurfaceVariant
        }]}>
            {movie.overview || 'No overview available.'}
          </Text>

          {}
          {cast.length > 0 && <>
              <Text variant="titleMedium" style={[styles.sectionTitle, {
            color: theme.colors.onSurface
          }]}>
                Cast
              </Text>
              <FlatList horizontal data={cast} keyExtractor={item => String(item.id)} renderItem={renderCastItem} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.castList} />
            
            </>}

          {}
          {similar.length > 0 && <>
              <Text variant="titleMedium" style={[styles.sectionTitle, {
            color: theme.colors.onSurface
          }]}>
                You May Also Like
              </Text>
              <FlatList horizontal data={similar} keyExtractor={item => String(item.id)} renderItem={renderSimilarItem} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarList} />
            
            </>}
        </View>
      </ScrollView>
    </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backdropWrap: {
    height: BACKDROP_HEIGHT,
    position: 'relative'
  },
  backdrop: {
    width: '100%',
    height: '100%'
  },
  backdropGradient: {
    ...StyleSheet.absoluteFillObject,
    top: '40%'
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 12,
    borderRadius: 20
  },
  heroRow: {
    flexDirection: 'row',
    marginTop: -60,
    paddingHorizontal: 16,
    gap: 14,
    alignItems: 'flex-end'
  },
  posterWrap: {
    borderRadius: 12,
    overflow: 'hidden'
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_WIDTH * 1.5,
    borderRadius: 12
  },
  primaryInfo: {
    flex: 1,
    paddingBottom: 4,
    gap: 6
  },
  title: {
    fontWeight: '900',
    lineHeight: 26
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40
  },
  genreRow: {
    marginBottom: 16
  },
  genreChip: {
    marginRight: 8,
    borderRadius: 16
  },
  favBtn: {
    borderRadius: 12,
    marginBottom: 20
  },
  favBtnContent: {
    paddingVertical: 4
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 8
  },
  overview: {
    lineHeight: 24,
    marginBottom: 8
  },
  castList: {
    paddingVertical: 4,
    gap: 12
  },
  castItem: {
    width: 70,
    alignItems: 'center'
  },
  castImgWrap: {
    borderRadius: CAST_IMG_SIZE / 2,
    overflow: 'hidden',
    marginBottom: 6
  },
  castImg: {
    width: CAST_IMG_SIZE,
    height: CAST_IMG_SIZE,
    borderRadius: CAST_IMG_SIZE / 2
  },
  castName: {
    textAlign: 'center',
    lineHeight: 14
  },
  similarList: {
    paddingVertical: 4,
    gap: 10
  },
  similarCard: {
    width: 110
  },
  similarSurface: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  similarPoster: {
    width: 110,
    height: 165
  },
  similarTitle: {
    padding: 6,
    lineHeight: 16
  }
});
