import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";

// 🔹 여기에 Firebase 프로젝트 설정 정보 추가
const firebaseConfig = {
    apiKey: "AIzaSyAXlqMRcQv_8AO5jgT4gOLacZoeV5OeB3o",
    authDomain: "sakura-tree-8a6b2.firebaseapp.com",
    projectId: "sakura-tree-8a6b2",
    storageBucket: "sakura-tree-8a6b2.firebasestorage.app",
    messagingSenderId: "1060509343836",
    appId: "1:1060509343836:web:72e5edd448bfcfa4318699",
    measurementId: "G-RYB98CRXKS"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  onSnapshot 
};
