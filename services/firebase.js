// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKum-CHr3ePp_gxc2XzVCSnKMM5xEcm5s",
  authDomain: "bank-38d33.firebaseapp.com",
  projectId: "bank-38d33",
  storageBucket: "bank-38d33.appspot.com",
  messagingSenderId: "1081949038268",
  appId: "1:1081949038268:web:51f3a2c666475e038c12b9",
  measurementId: "G-29RWZEX38J"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  // Check for user status
});