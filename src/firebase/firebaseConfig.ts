import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrFSD2rDNbV97VXl-GXl_Wcjtilq7PQOI",
  authDomain: "salas-ani.firebaseapp.com",
  projectId: "salas-ani",
  storageBucket: "salas-ani.firebasestorage.app",
  messagingSenderId: "537857312886",
  appId: "1:537857312886:web:4706b25a6bdc510a40f757",
  measurementId: "G-GJHZTR219Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);