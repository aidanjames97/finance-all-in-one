import { initializeApp } from "firebase/app";
import { apiKey, appId, messagingSenderId, measurementId } from "./api";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "finance-all-in-one.firebaseapp.com",
    projectId: "finance-all-in-one",
    storageBucket: "finance-all-in-one.appspot.com",
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authenticator init
const auth = getAuth()

// Google authenticator provider init
const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, auth, googleProvider }