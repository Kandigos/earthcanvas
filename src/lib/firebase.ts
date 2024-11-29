import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCGToVX0B_fSahllDCO6dkK2LQftQAkItg",
  authDomain: "kandigana-a72bc.firebaseapp.com",
  projectId: "kandigana-a72bc",
  storageBucket: "kandigana-a72bc.firebasestorage.app",
  messagingSenderId: "550155094203",
  appId: "1:550155094203:web:b99190a47cf9e3ab1bc19e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);