// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbz_dcLAdzebW-gFw8oFpnadv8Ee16En8",
  authDomain: "twitter-clone-9b400.firebaseapp.com",
  projectId: "twitter-clone-9b400",
  storageBucket: "twitter-clone-9b400.appspot.com",
  messagingSenderId: "374968634268",
  appId: "1:374968634268:web:f16611ac32ab4743131659",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth referance

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
