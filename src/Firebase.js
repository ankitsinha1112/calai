import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDhptsT5vN6eQjfoneGnJdiU_DTvYjzleg",
    authDomain: "calai-c5657.firebaseapp.com",
    projectId: "calai-c5657",
    storageBucket: "calai-c5657.appspot.com",
    messagingSenderId: "554848493012",
    appId: "1:554848493012:web:d134a280e0b6e3a88fca41",
    measurementId: "G-VMDGDM6G9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { app, analytics, auth }