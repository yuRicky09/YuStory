import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.VUE_APP_FIREBASE}`,
  authDomain: "yu-story.firebaseapp.com",
  projectId: "yu-story",
  storageBucket: "yu-story.appspot.com",
  messagingSenderId: "362985153097",
  appId: "1:362985153097:web:68d3fe72a5603f2437d598",
  measurementId: "G-2PCR4WS2PF",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const googleProvider = new firebase.auth.GoogleAuthProvider();

// 當用戶有多個google帳號時，登入都會訊問要使用的google帳號
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export { db, storage, auth, timestamp, googleProvider, arrayUnion };
