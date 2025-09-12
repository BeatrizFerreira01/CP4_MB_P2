import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Divider } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { changeLanguagePersist } from '../i18n';

export default function SignInScreen() {
  const { t } = useTranslation();
  const { signInEmail, signUpEmail, signInGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={s.container}>
      <Text variant="headlineSmall">{t('appName')}</Text>
      <TextInput label={t('email')} value={email} onChangeText={setEmail} style={s.input} />
      <TextInput label={t('password')} value={password} onChangeText={setPassword} secureTextEntry style={s.input} />
      <Button mode="contained" onPress={() => signInEmail(email, password)}>{t('signIn')}</Button>
      <Button onPress={() => signUpEmail(email, password)}>{t('createAccount')}</Button>
      <Divider style={{ marginVertical: 12 }} />
      <Button icon="google" mode="outlined" onPress={signInGoogle}>{t('googleSignIn')}</Button>

      <View style={{ height: 16 }} />
      <Button onPress={() => changeLanguagePersist('pt')}>PT</Button>
      <Button onPress={() => changeLanguagePersist('en')}>EN</Button>
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', gap: 12 },
  input: { marginBottom: 8 }
});
