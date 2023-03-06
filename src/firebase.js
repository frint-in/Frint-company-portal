import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "frint-a940b.firebaseapp.com",
  projectId: "frint-a940b",
  storageBucket: "frint-a940b.appspot.com",
  messagingSenderId: "589147506507",
  appId: "1:589147506507:web:360e9a03f4f12e1d668ace",
  measurementId: "G-T69YMYE954"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;