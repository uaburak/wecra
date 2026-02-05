
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBy7RX06084DKTZA7cAxqdaTbqprE-zmvU",
    authDomain: "wecra-net.firebaseapp.com",
    projectId: "wecra-net",
    storageBucket: "wecra-net.firebasestorage.app",
    messagingSenderId: "39703990561",
    appId: "1:39703990561:web:1cd1dd0a090d3c900fee60",
    measurementId: "G-6BWFKMFZ3F"
};

// Initialize Firebase
// Avoid re-initializing if already initialized (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics (Safe check for SSR)
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

const db = getFirestore(app);

export { app, analytics, db };
