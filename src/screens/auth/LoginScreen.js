import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, HelperText, Surface, useTheme, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../hooks/useAuth';
export default function LoginScreen({
  navigation
}) {
  const theme = useTheme();
  const {
    login,
    isLoading,
    error,
    clearError
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [snackVisible, setSnack] = useState(false);
  useEffect(() => {
    if (error) setSnack(true);
  }, [error]);
  async function handleLogin() {
    if (!email.trim() || !password) return;
    await login(email.trim(), password);
  }
  function dismissSnack() {
    setSnack(false);
    clearError();
  }
  return <LinearGradient colors={theme.dark ? ['#0D0D0D', '#1a1a2e'] : ['#1a1a2e', '#16213e']} style={styles.gradient}>
      
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          
          {}
          <View style={styles.header}>
            <Text style={styles.logo}>🎬</Text>
            <Text variant="displaySmall" style={styles.appName}>Movie Explorer</Text>
            <Text variant="bodyMedium" style={styles.tagline}>Your cinematic universe awaits</Text>
          </View>

          {}
          <Surface style={[styles.card, {
          backgroundColor: theme.colors.surface
        }]} elevation={4}>
            <Text variant="headlineMedium" style={[styles.cardTitle, {
            color: theme.colors.onSurface
          }]}>
              Welcome back
            </Text>

            <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" autoCapitalize="none" autoComplete="email" style={styles.input} left={<TextInput.Icon icon="email-outline" />} />
            

            <TextInput label="Password" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry={!showPass} autoCapitalize="none" style={styles.input} left={<TextInput.Icon icon="lock-outline" />} right={<TextInput.Icon icon={showPass ? 'eye-off' : 'eye'} onPress={() => setShowPass(!showPass)} />} />
            

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotBtn}>
              
              <Text variant="labelMedium" style={{
              color: theme.colors.primary
            }}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            <Button mode="contained" onPress={handleLogin} loading={isLoading} disabled={isLoading || !email.trim() || !password} style={styles.loginBtn} contentStyle={styles.loginBtnContent} labelStyle={styles.loginBtnLabel}>
              
              Sign In
            </Button>

            <View style={styles.registerRow}>
              <Text variant="bodyMedium" style={{
              color: theme.colors.onSurfaceVariant
            }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text variant="bodyMedium" style={{
                color: theme.colors.primary,
                fontWeight: '700'
              }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar visible={snackVisible} onDismiss={dismissSnack} duration={4000} action={{
      label: 'OK',
      onPress: dismissSnack
    }}>
        
        {error}
      </Snackbar>
    </LinearGradient>;
}
const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  flex: {
    flex: 1
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24
  },
  header: {
    alignItems: 'center',
    marginBottom: 32
  },
  logo: {
    fontSize: 56
  },
  appName: {
    color: '#ffffff',
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 8
  },
  tagline: {
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4
  },
  card: {
    borderRadius: 24,
    padding: 24
  },
  cardTitle: {
    fontWeight: '800',
    marginBottom: 20
  },
  input: {
    marginBottom: 12
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20
  },
  loginBtn: {
    borderRadius: 12,
    marginBottom: 20
  },
  loginBtnContent: {
    paddingVertical: 6
  },
  loginBtnLabel: {
    fontWeight: '700',
    fontSize: 16
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
