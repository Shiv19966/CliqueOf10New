// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from 'firebase/analytics'; 

const firebaseConfig = {
  apiKey: "AIzaSyB3QDmjLsVcxCnUV_VCVFw8jwuNDwnv_SE",
  authDomain: "client-chat-app-cf8d4.firebaseapp.com",
  projectId: "client-chat-app-cf8d4",
  storageBucket: "client-chat-app-cf8d4.appspot.com",
  messagingSenderId: "332247187672",
  appId: "1:332247187672:web:db82ae0feb5892ece797ad",
  measurementId: "G-95S8L051YP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
const auth = getAuth(app);
const firestore = getFirestore(app);
export { app, auth, firestore };
