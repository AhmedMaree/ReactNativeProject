import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../hooks/useAuth';
export default function RegisterScreen({
  navigation
}) {
  const theme = useTheme();
  const {
    register,
    isLoading,
    error,
    clearError
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [localError, setLocalError] = useState('');
  const [snackVisible, setSnack] = useState(false);
  useEffect(() => {
    if (error) setSnack(true);
  }, [error]);
  function validate() {
    if (!email.trim()) return 'Please enter your email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirm) return 'Passwords do not match.';
    return null;
  }
  async function handleRegister() {
    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      setSnack(true);
      return;
    }
    setLocalError('');
    await register(email.trim(), password);
  }
  function dismissSnack() {
    setSnack(false);
    clearError();
    setLocalError('');
  }
  return <LinearGradient colors={theme.dark ? ['#0D0D0D', '#1a1a2e'] : ['#1a1a2e', '#16213e']} style={styles.gradient}>
      
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <Text style={styles.logo}>🎬</Text>
            <Text variant="displaySmall" style={styles.appName}>Create Account</Text>
            <Text variant="bodyMedium" style={styles.tagline}>
              Join and start exploring movies
            </Text>
          </View>

          <Surface style={[styles.card, {
          backgroundColor: theme.colors.surface
        }]} elevation={4}>
            <Text variant="headlineMedium" style={[styles.cardTitle, {
            color: theme.colors.onSurface
          }]}>
              Sign Up
            </Text>

            <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" autoCapitalize="none" autoComplete="email" style={styles.input} left={<TextInput.Icon icon="email-outline" />} />
            

            <TextInput label="Password" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry={!showPass} autoCapitalize="none" style={styles.input} left={<TextInput.Icon icon="lock-outline" />} right={<TextInput.Icon icon={showPass ? 'eye-off' : 'eye'} onPress={() => setShowPass(!showPass)} />} />
            

            <TextInput label="Confirm Password" value={confirm} onChangeText={setConfirm} mode="outlined" secureTextEntry={!showPass} autoCapitalize="none" style={styles.input} left={<TextInput.Icon icon="lock-check-outline" />} />
            

            <Button mode="contained" onPress={handleRegister} loading={isLoading} disabled={isLoading} style={styles.btn} contentStyle={styles.btnContent} labelStyle={styles.btnLabel}>
              
              Create Account
            </Button>

            <View style={styles.loginRow}>
              <Text variant="bodyMedium" style={{
              color: theme.colors.onSurfaceVariant
            }}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text variant="bodyMedium" style={{
                color: theme.colors.primary,
                fontWeight: '700'
              }}>
                  Sign in
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
        
        {localError || error}
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
  btn: {
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20
  },
  btnContent: {
    paddingVertical: 6
  },
  btnLabel: {
    fontWeight: '700',
    fontSize: 16
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
