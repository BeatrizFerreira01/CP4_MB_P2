import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '../firebase/config';
import {
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, signInWithCredential, GoogleAuthProvider
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'SEU_CLIENT_ID_WEB.apps.googleusercontent.com',
    androidClientId: 'SEU_CLIENT_ID_ANDROID.apps.googleusercontent.com',
    iosClientId: 'SEU_CLIENT_ID_IOS.apps.googleusercontent.com',
    expoClientId: 'SEU_CLIENT_ID_EXPO.apps.googleusercontent.com'
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      if (initializing) setInitializing(false);
    });
    return unsub;
  }, []);

  // Google → Firebase
  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.params?.id_token;
      if (idToken) {
        const cred = GoogleAuthProvider.credential(idToken);
        signInWithCredential(auth, cred).catch(console.warn);
      }
    }
  }, [response]);

  const value = useMemo(() => ({
    user,
    initializing,
    signInEmail: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signUpEmail: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    signOut: () => signOut(auth),
  
    signInGoogle: () => promptAsync({ useProxy: Platform.OS !== 'web' })
  }), [user, initializing, promptAsync]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
