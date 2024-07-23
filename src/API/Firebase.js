import { initializeApp } from "firebase/app";
import { apiKey, appId, messagingSenderId, measurementId } from "./api";
import { getFirestore } from 'firebase/firestore';

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }