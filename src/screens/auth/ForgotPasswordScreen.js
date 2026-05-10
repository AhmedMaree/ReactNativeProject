import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../hooks/useAuth';
export default function ForgotPasswordScreen({
  navigation
}) {
  const theme = useTheme();
  const {
    sendPasswordReset,
    isLoading,
    error,
    clearError
  } = useAuth();
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [snackVisible, setSnack] = useState(false);
  useEffect(() => {
    if (error) setSnack(true);
  }, [error]);
  async function handleReset() {
    if (!email.trim()) return;
    const result = await sendPasswordReset(email.trim());
    if (result?.success) {
      setSuccessMsg(`Reset link sent to ${email.trim()}. Check your inbox.`);
      setSnack(true);
    }
  }
  function dismissSnack() {
    setSnack(false);
    clearError();
    setSuccessMsg('');
  }
  return <LinearGradient colors={theme.dark ? ['#0D0D0D', '#1a1a2e'] : ['#1a1a2e', '#16213e']} style={styles.gradient}>
      
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <Text style={styles.icon}>🔑</Text>
            <Text variant="displaySmall" style={styles.appName}>Reset Password</Text>
            <Text variant="bodyMedium" style={styles.tagline}>
              We'll send you a link to reset it
            </Text>
          </View>

          <Surface style={[styles.card, {
          backgroundColor: theme.colors.surface
        }]} elevation={4}>
            <Text variant="bodyMedium" style={[styles.body, {
            color: theme.colors.onSurfaceVariant
          }]}>
              
              Enter the email address associated with your account and we'll send a password reset link.
            </Text>

            <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" autoCapitalize="none" autoComplete="email" style={styles.input} left={<TextInput.Icon icon="email-outline" />} />
            

            <Button mode="contained" onPress={handleReset} loading={isLoading} disabled={isLoading || !email.trim()} style={styles.btn} contentStyle={styles.btnContent} labelStyle={styles.btnLabel} icon="send">
              
              Send Reset Link
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backBtn}>
              
              <Text variant="labelLarge" style={{
              color: theme.colors.primary
            }}>
                ← Back to Sign In
              </Text>
            </TouchableOpacity>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar visible={snackVisible} onDismiss={dismissSnack} duration={5000} action={{
      label: 'OK',
      onPress: dismissSnack
    }}>
        
        {successMsg || error}
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
  icon: {
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
  body: {
    marginBottom: 20,
    lineHeight: 22
  },
  input: {
    marginBottom: 16
  },
  btn: {
    borderRadius: 12,
    marginBottom: 16
  },
  btnContent: {
    paddingVertical: 6
  },
  btnLabel: {
    fontWeight: '700',
    fontSize: 16
  },
  backBtn: {
    alignSelf: 'center'
  }
});
