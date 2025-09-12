import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDm32Y5FPyeMdp6jElL9I8IwNddxRZEGgI",
  authDomain: "lista-tarefas-plus-561a4.firebaseapp.com",
  projectId: "lista-tarefas-plus-561a4",
  storageBucket: "lista-tarefas-plus-561a4.appspot.com",
  messagingSenderId: "920910901009",
  appId: "1:920910901009:web:d02d3c1802b5cd764366b0"
};

// Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
