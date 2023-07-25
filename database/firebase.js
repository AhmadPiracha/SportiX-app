import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAEJu-bwgtnXIRA46igMXNM_r28nC2T948",
  authDomain: "sportix-87892.firebaseapp.com",
  projectId: "sportix-87892",
  storageBucket: "sportix-87892.appspot.com",
  messagingSenderId: "101839728124",
  appId: "1:101839728124:web:b17293556ac1df0eb5d679",
  measurementId: "G-7EZ4TN0262"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

const db = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, GoogleProvider };
