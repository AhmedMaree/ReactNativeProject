import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Text, Avatar, Divider, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
function CustomDrawerContent(props) {
  const theme = useTheme();
  const {
    user,
    logout
  } = useAuth();
  const {
    favorites
  } = useFavorites();
  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : '??';
  return <DrawerContentScrollView {...props} style={{
    backgroundColor: theme.colors.surface
  }}>
      
      {}
      <View style={[styles.drawerHeader, {
      backgroundColor: theme.colors.primary
    }]}>
        <Avatar.Text size={56} label={initials} style={{
        backgroundColor: 'rgba(255,255,255,0.25)'
      }} color="#ffffff" />
        
        <Text variant="titleMedium" style={styles.drawerEmail}>
          {user?.email}
        </Text>
        <Text variant="bodySmall" style={styles.drawerFavCount}>
          ❤️ {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <DrawerItemList {...props} />

      <Divider style={styles.drawerDivider} />

      {}
      <DrawerItem label="Sign Out" icon={({
      color,
      size
    }) => <MaterialCommunityIcons name="logout" color={theme.colors.error} size={size} />} labelStyle={{
      color: theme.colors.error,
      fontWeight: '700'
    }} onPress={logout} />
      
    </DrawerContentScrollView>;
}
function HomeStack() {
  return <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Stack.Navigator>;
}
function FavoritesStack() {
  return <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Stack.Navigator>;
}
export default function AppNavigator() {
  const theme = useTheme();
  return <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} screenOptions={{
    headerShown: false,
    drawerStyle: {
      backgroundColor: theme.colors.surface,
      width: 280
    },
    drawerActiveTintColor: theme.colors.primary,
    drawerInactiveTintColor: theme.colors.onSurfaceVariant,
    drawerLabelStyle: {
      fontWeight: '600',
      marginLeft: -8
    }
  }}>
      
      <Drawer.Screen name="HomeDrawer" component={HomeStack} options={{
      title: 'Home',
      drawerIcon: ({
        color,
        size
      }) => <MaterialCommunityIcons name="home-outline" color={color} size={size} />
    }} />
      
      <Drawer.Screen name="FavoritesDrawer" component={FavoritesStack} options={{
      title: 'Favorites',
      drawerIcon: ({
        color,
        size
      }) => <MaterialCommunityIcons name="heart-outline" color={color} size={size} />
    }} />
      
      <Drawer.Screen name="ProfileDrawer" component={ProfileScreen} options={{
      title: 'Profile',
      drawerIcon: ({
        color,
        size
      }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} />
    }} />
      
    </Drawer.Navigator>;
}
const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    paddingTop: 48,
    paddingBottom: 20,
    gap: 8,
    marginBottom: 8
  },
  drawerEmail: {
    color: '#ffffff',
    fontWeight: '700'
  },
  drawerFavCount: {
    color: 'rgba(255,255,255,0.8)'
  },
  drawerDivider: {
    marginVertical: 8
  }
});
