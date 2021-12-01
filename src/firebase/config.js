import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.VUE_APP_FIREBASE}`,
  authDomain: "yustory-ded59.firebaseapp.com",
  projectId: "yustory-ded59",
  storageBucket: "yustory-ded59.appspot.com",
  messagingSenderId: "346858590",
  appId: "1:346858590:web:4f8c56de4ee9275b5a00cf",
  measurementId: "G-F4TB93GX9Y",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
const googleProvider = new firebase.auth.GoogleAuthProvider();

// 當用戶有多個 google 帳號時，登入都會訊問要使用的 google 帳號
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export {
  db,
  storage,
  auth,
  timestamp,
  googleProvider,
  arrayUnion,
  arrayRemove,
};
