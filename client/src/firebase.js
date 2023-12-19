// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "optimalpoolapp.firebaseapp.com",
  projectId: "optimalpoolapp",
  storageBucket: "optimalpoolapp.appspot.com",
  messagingSenderId: "386299121484",
  appId: "1:386299121484:web:ea14b60db591e8842bc9e9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);