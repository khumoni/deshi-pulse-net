// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaKeCQcEq6KybhjIN4gIrl2CPhqzsRlW4",
  authDomain: "macro-incline-464806-t1.firebaseapp.com",
  databaseURL: "https://macro-incline-464806-t1-default-rtdb.firebaseio.com",
  projectId: "macro-incline-464806-t1",
  storageBucket: "macro-incline-464806-t1.firebasestorage.app",
  messagingSenderId: "1095023712783",
  appId: "1:1095023712783:web:ec278a2a3636ca74c3217a",
  measurementId: "G-DRM8W88503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;