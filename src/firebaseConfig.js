// src/firebaseConfig.js
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"; // Add this import
import {getStorage} from "firebase/storage";

// Add credentials in environment var
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider for Google sign-in
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore and get a reference to the service
export const firestore = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);
