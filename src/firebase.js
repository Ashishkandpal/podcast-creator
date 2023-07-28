// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnB1SEjozK0BeL5W2CiKNtSLsgtilzuXE",
  authDomain: "podcast-db-6b9de.firebaseapp.com",
  projectId: "podcast-db-6b9de",
  storageBucket: "podcast-db-6b9de.appspot.com",
  messagingSenderId: "271583544502",
  appId: "1:271583544502:web:c640d2ed059c4343ea9217",
  measurementId: "G-5JZ1LDF8MC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
