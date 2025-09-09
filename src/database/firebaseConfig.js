// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4emA-ue-tYceSFesDRIZXSLahr-zK7Lg",
  authDomain: "wedding-invitation-1e823.firebaseapp.com",
  projectId: "wedding-invitation-1e823",
  storageBucket: "wedding-invitation-1e823.firebasestorage.app",
  messagingSenderId: "826546808367",
  appId: "1:826546808367:web:08896b3355fe4a58f7c8da",
  measurementId: "G-7FXQ99X52D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
