import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "amplify-d7eb4.firebaseapp.com",
  projectId: "amplify-d7eb4",
  storageBucket: "amplify-d7eb4.appspot.com",
  messagingSenderId: "94398525146",
  appId: "1:94398525146:web:e851222f1aae3daefd7fe3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);