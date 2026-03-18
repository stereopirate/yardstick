import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc,
  deleteDoc, updateDoc, serverTimestamp, query, orderBy, where, limit
} from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey:            "AIzaSyBYkHARramuf6Xwu0BGfxKqukHfw_OgePw",
  authDomain:        "lawn-tracker-71c43.firebaseapp.com",
  projectId:         "lawn-tracker-71c43",
  storageBucket:     "lawn-tracker-71c43.firebasestorage.app",
  messagingSenderId: "24765427828",
  appId:             "1:24765427828:web:d8e1229477658e4250e121"
};

const FIREBASE_CONFIGURED = !firebaseConfig.apiKey.startsWith('REPLACE');

export function initFirebase() {
  if (!FIREBASE_CONFIGURED) {
    window.__FIREBASE__ = { configured: false };
    console.info('Yardstick: Firebase not configured — running in local-only mode.');
    window.dispatchEvent(new Event('firebase-ready'));
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    window.__FIREBASE__ = {
      auth: getAuth(app),
      db: getFirestore(app),
      storage: getStorage(app),
      GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword,
      createUserWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser,
      doc, getDoc, setDoc, collection, getDocs, addDoc,
      deleteDoc, updateDoc, serverTimestamp, query, orderBy, where, limit,
      storageRef, uploadBytes, getDownloadURL,
      configured: true
    };
  } catch (e) {
    console.error('Firebase init failed:', e);
    window.__FIREBASE__ = { configured: false };
  }

  window.dispatchEvent(new Event('firebase-ready'));
}
