// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI8amjnBQeGx-PG2f3jJg9UcNLrCkHym0",
  authDomain: "efolio4.firebaseapp.com",
  projectId: "efolio4",
  storageBucket: "efolio4.appspot.com",
  messagingSenderId: "492013215501",
  appId: "1:492013215501:web:5ba60429210317322f5a44",
  measurementId: "G-B6XFFZJ8YV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Export the db object directly
export default db;
