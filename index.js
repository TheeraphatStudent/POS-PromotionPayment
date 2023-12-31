// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDoc, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCep2cSjMvS_Ze9nouWNMJFfr15blk0hkQ",
    authDomain: "pos-kumtotakoyaki.firebaseapp.com",
    projectId: "pos-kumtotakoyaki",
    storageBucket: "pos-kumtotakoyaki.appspot.com",
    messagingSenderId: "255461602327",
    appId: "1:255461602327:web:c84aac93d6d69871bb5852",
    measurementId: "G-S1TP66TMNR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log("Logged in");
    } else {
        console.log("No user");
    }
});
