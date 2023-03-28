import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API,
  authDomain: "bubbles-internal-db.firebaseapp.com",
  databaseURL: "https://bubbles-internal-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bubbles-internal-db",
  storageBucket: "bubbles-internal-db.appspot.com",
  messagingSenderId: "759874805262",
  appId: "1:759874805262:web:03345e4d2dd12e36db665f"
};

//init firebase app
const app = initializeApp(firebaseConfig)

//init db
const db = getFirestore(app);

export {
  db
}