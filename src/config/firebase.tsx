import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import 'firebase/compat/storage';
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";


export const config = {
    firebaseConfig: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
        projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
        storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
        messagingSenderId: `532627868488`,
        appId: process.env.REACT_APP_FIREBASE_APPID
    }
}

export const app = initializeApp(config.firebaseConfig);

export const db = getFirestore();

