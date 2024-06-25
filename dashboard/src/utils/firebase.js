import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDePEWeHOItUX1XcWcicOLCyC6KuswOqt0",
  authDomain: "medical-7abfd.firebaseapp.com",
  projectId: "medical-7abfd",
  storageBucket: "medical-7abfd.appspot.com",
  messagingSenderId: "1097711019859",
  appId: "1:1097711019859:web:9288fa6ff7e106861ae3a6",
  measurementId: "G-WD134GH26F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
