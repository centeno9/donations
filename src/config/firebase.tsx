import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import 'firebase/compat/storage';
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

console.log("test")

export const config = {
    firebaseConfig: {
        apiKey: "AIzaSyDa1HmQTXpBCH4ILQaVlgLcXJcT3J2Pr4A",
        authDomain: "seminuevos-600b0.firebaseapp.com",
        projectId: "seminuevos-600b0",
        storageBucket: "seminuevos-600b0.appspot.com",
        messagingSenderId: "532627868488",
        appId: "1:532627868488:web:b2ba75de232cd9432f417d"
    }
}

export const app = initializeApp(config.firebaseConfig);

export const db = getFirestore();

