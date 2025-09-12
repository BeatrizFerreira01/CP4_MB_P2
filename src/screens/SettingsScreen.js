import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useThemeSwitcher } from '../contexts/ThemeContext';
import { changeLanguagePersist } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { scheme, toggle } = useThemeSwitcher();
  const { signOut } = useAuth();

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>{t('theme')}: {scheme}</Text>
      <Button onPress={toggle}>Toggle</Button>
      <Text>{t('language')}</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button onPress={() => changeLanguagePersist('pt')}>PT</Button>
        <Button onPress={() => changeLanguagePersist('en')}>EN</Button>
      </View>
      <Button mode="outlined" onPress={signOut}>{t('logout')}</Button>
    </View>
  );
}
