import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "frint-93252.firebaseapp.com",
  projectId: "frint-93252",
  storageBucket: "frint-93252.appspot.com",
  messagingSenderId: "112159900353",
  appId: "1:112159900353:web:17e3f4a82bb482f2524a40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;