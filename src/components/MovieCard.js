import React, { memo } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TMDB_IMAGE_BASE_URL } from '../utils/constants';
const PLACEHOLDER = require('../../assets/placeholder.png');
function MovieCard({
  movie,
  onPress,
  isFavorite = false,
  onFavorite
}) {
  const theme = useTheme();
  const posterUri = movie.poster_path ? {
    uri: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
  } : PLACEHOLDER;
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—';
  return <TouchableOpacity style={styles.touchable} onPress={onPress} activeOpacity={0.85}>
      
      <Surface style={[styles.card, {
      backgroundColor: theme.colors.surface
    }]} elevation={2}>
        {}
        <Image source={posterUri} style={styles.poster} resizeMode="cover" defaultSource={PLACEHOLDER} />
        

        {}
        {onFavorite && <TouchableOpacity style={[styles.favoriteBtn, {
        backgroundColor: 'rgba(0,0,0,0.55)'
      }]} onPress={onFavorite} hitSlop={{
        top: 8,
        bottom: 8,
        left: 8,
        right: 8
      }}>
          
            <MaterialCommunityIcons name={isFavorite ? 'heart' : 'heart-outline'} size={18} color={isFavorite ? theme.colors.primary : '#ffffff'} />
          
          </TouchableOpacity>}

        {}
        <View style={[styles.info, {
        backgroundColor: theme.colors.surface
      }]}>
          <Text variant="labelMedium" numberOfLines={2} style={[styles.title, {
          color: theme.colors.onSurface
        }]}>
            
            {movie.title}
          </Text>
          <View style={styles.meta}>
            <MaterialCommunityIcons name="star" size={12} color="#F5A623" />
            <Text variant="labelSmall" style={[styles.metaText, {
            color: theme.colors.onSurfaceVariant
          }]}>
              
              {rating}
            </Text>
            <Text variant="labelSmall" style={[styles.metaText, {
            color: theme.colors.onSurfaceVariant
          }]}>
              
              · {year}
            </Text>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>;
}
export default memo(MovieCard);
const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    margin: 6
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden'
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 16,
    padding: 5
  },
  info: {
    padding: 8
  },
  title: {
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 16
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  metaText: {
    marginLeft: 2
  }
});
