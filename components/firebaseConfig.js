// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaFQ2q0wi9o2jWctb222F41JevRdIA0mY",
  authDomain: "mobileappdevprojects-818da.firebaseapp.com",
  projectId: "mobileappdevprojects-818da",
  storageBucket: "mobileappdevprojects-818da.firebasestorage.app",
  messagingSenderId: "66031533092",
  appId: "1:66031533092:web:cda6c670f7c57e1b882cb1",
  measurementId: "G-SB24Q5KJL6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
