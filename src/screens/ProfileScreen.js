import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Text, Avatar, Surface, Switch, Button, Divider, Dialog, Portal, useTheme, List } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { useTheme as useAppTheme } from '../hooks/useTheme';
export default function ProfileScreen({
  navigation
}) {
  const theme = useTheme();
  const {
    user,
    logout
  } = useAuth();
  const {
    favorites
  } = useFavorites();
  const {
    isDarkMode,
    toggleTheme
  } = useAppTheme();
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : '??';
  async function handleLogout() {
    setLogoutDialogVisible(false);
    await logout();
  }
  return <View style={[styles.container, {
    backgroundColor: theme.colors.background
  }]}>
      <Appbar.Header elevated>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Profile" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scroll}>
        {}
        <Surface style={[styles.profileCard, {
        backgroundColor: theme.colors.surface
      }]} elevation={2}>
          <Avatar.Text size={72} label={initials} style={{
          backgroundColor: theme.colors.primary
        }} />
          <Text variant="titleLarge" style={[styles.email, {
          color: theme.colors.onSurface
        }]}>
            {user?.email || 'Unknown user'}
          </Text>
          {user?.displayName ? <Text variant="bodyMedium" style={{
          color: theme.colors.onSurfaceVariant
        }}>
              {user.displayName}
            </Text> : null}
        </Surface>

        {}
        <Surface style={[styles.statsCard, {
        backgroundColor: theme.colors.surface
      }]} elevation={2}>
          <View style={styles.statItem}>
            <Text variant="displaySmall" style={[styles.statNumber, {
            color: theme.colors.primary
          }]}>
              {favorites.length}
            </Text>
            <Text variant="bodyMedium" style={{
            color: theme.colors.onSurfaceVariant
          }}>
              Favorite{favorites.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </Surface>

        {}
        <Surface style={[styles.settingsCard, {
        backgroundColor: theme.colors.surface
      }]} elevation={2}>
          <Text variant="titleMedium" style={[styles.sectionLabel, {
          color: theme.colors.onSurface
        }]}>
            Preferences
          </Text>
          <Divider style={styles.divider} />

          <List.Item title="Dark Mode" description={isDarkMode ? 'Enabled' : 'Disabled'} titleStyle={{
          color: theme.colors.onSurface
        }} descriptionStyle={{
          color: theme.colors.onSurfaceVariant
        }} left={props => <List.Icon {...props} icon={isDarkMode ? 'weather-night' : 'weather-sunny'} />} right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} color={theme.colors.primary} />} />
          

          <Divider style={styles.divider} />

          <List.Item title="Account" description={user?.email} titleStyle={{
          color: theme.colors.onSurface
        }} descriptionStyle={{
          color: theme.colors.onSurfaceVariant
        }} left={props => <List.Icon {...props} icon="account-circle-outline" />} />
          
        </Surface>

        {}
        <Button mode="outlined" icon="logout" onPress={() => setLogoutDialogVisible(true)} style={styles.logoutBtn} contentStyle={styles.logoutBtnContent} textColor={theme.colors.error}>
          
          Sign Out
        </Button>
      </ScrollView>

      {}
      <Portal>
        <Dialog visible={logoutDialogVisible} onDismiss={() => setLogoutDialogVisible(false)} style={{
        borderRadius: 20
      }}>
          
          <Dialog.Icon icon="logout" />
          <Dialog.Title style={{
          textAlign: 'center'
        }}>Sign Out</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{
            textAlign: 'center'
          }}>
              Are you sure you want to sign out of your account?
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button onPress={() => setLogoutDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleLogout} textColor={theme.colors.error}>
              Sign Out
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appbarTitle: {
    fontWeight: '800'
  },
  scroll: {
    padding: 16,
    gap: 16,
    paddingBottom: 40
  },
  profileCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 10
  },
  email: {
    fontWeight: '700',
    textAlign: 'center'
  },
  statsCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  statItem: {
    alignItems: 'center',
    gap: 4
  },
  statNumber: {
    fontWeight: '900'
  },
  settingsCard: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  sectionLabel: {
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4
  },
  divider: {
    marginHorizontal: 16
  },
  logoutBtn: {
    borderRadius: 12,
    borderColor: 'transparent',
    marginTop: 8
  },
  logoutBtnContent: {
    paddingVertical: 4
  },
  dialogActions: {
    justifyContent: 'space-around'
  }
});
