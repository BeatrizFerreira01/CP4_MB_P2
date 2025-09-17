import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "lista-tarefas-plus-561a4.firebaseapp.com",
  projectId: "lista-tarefas-plus-561a4",
  storageBucket: "lista-tarefas-plus-561a4.appspot.com",
  messagingSenderId: "",
  appId: ""
};

// Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
