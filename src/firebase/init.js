// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMHW7GqJOjynZiXAosg4d7pCD0Yw0D3CA",
  authDomain: "w9-5032.firebaseapp.com",
  projectId: "w9-5032",
  storageBucket: "w9-5032.appspot.com",
  messagingSenderId: "847487167555",
  appId: "1:847487167555:web:6f09019fb7f4e2d678f8f6",
  measurementId: "G-5FVJDW7EKJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Export the db object directly
export default db;
