import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDWit1q5OsD1ElsTK8a2r-6z1NLklIxjS0",
  authDomain: "conhecamundo-3d271.firebaseapp.com",
  projectId: "conhecamundo-3d271",
  storageBucket: "conhecamundo-3d271.firebasestorage.app",
  messagingSenderId: "686036889734",
  appId: "1:686036889734:web:d7b02347bae96bdd8be107",
  measurementId: "G-5FCRP6RCVS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);