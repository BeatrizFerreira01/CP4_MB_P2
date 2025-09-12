import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { DarkTheme as NavDark, DefaultTheme as NavLight } from '@react-navigation/native';

const KEY = '@theme:scheme';
const ThemeContext = createContext(null);
export const useThemeSwitcher = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [scheme, setScheme] = useState('light');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(KEY);
      if (saved) setScheme(saved);
    })();
  }, []);

  const toggle = async () => {
    const next = scheme === 'light' ? 'dark' : 'light';
    setScheme(next);
    await AsyncStorage.setItem(KEY, next);
  };

  const paperTheme = scheme === 'light' ? MD3LightTheme : MD3DarkTheme;
  const navTheme = scheme === 'light' ? NavLight : NavDark;

  const value = useMemo(() => ({ scheme, toggle, paperTheme, navTheme }), [scheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
