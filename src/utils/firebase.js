// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-e96f1.firebaseapp.com",
  projectId: "netflixgpt-e96f1",
  storageBucket: "netflixgpt-e96f1.appspot.com",
  messagingSenderId: "232703567060",
  appId: "1:232703567060:web:f6cfb40b44d8060d1d0741",
  measurementId: "G-02LJ92DCY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();