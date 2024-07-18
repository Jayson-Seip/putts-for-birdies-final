import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC8EvtrN16esu_Ckpe7RNBimRTDz6C8lAM",
    authDomain: "putts-for-birdies.firebaseapp.com",
    projectId: "putts-for-birdies",
    storageBucket: "putts-for-birdies.appspot.com",
    messagingSenderId: "858888394521",
    appId: "1:858888394521:web:9a3aed4eb11042685b5788"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };