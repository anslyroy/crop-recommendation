import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXQyVbAvcu3qbMaj7di_ouiOj1SIkGSXQ",
  authDomain: "crop-recommendation-3ee3d.firebaseapp.com",
  projectId: "crop-recommendation-3ee3d",
  storageBucket: "crop-recommendation-3ee3d.appspot.com",
  messagingSenderId: "895865461291",
  appId: "1:895865461291:web:1fbdcb8a6f95cf3db6286e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);



export { app, auth, db };