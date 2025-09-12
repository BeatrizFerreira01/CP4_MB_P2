import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import pt from './pt.json';
import en from './en.json';

const KEY = '@i18n:lang';

export const changeLanguagePersist = async (lng) => {
  await i18n.changeLanguage(lng);
  await AsyncStorage.setItem(KEY, lng);
};

const resources = { pt: { translation: pt }, en: { translation: en } };

(async () => {
  const saved = await AsyncStorage.getItem(KEY);
  const fallback = Localization.getLocales()?.[0]?.languageCode === 'pt' ? 'pt' : 'en';

  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng: saved || fallback,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
    });
})();

export default i18n;
