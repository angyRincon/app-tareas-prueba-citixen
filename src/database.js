import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyB-ErzrflksYS5FLVeZzuuY419fuuu4BFI",
    authDomain: "crud-prueba-citixen.firebaseapp.com",
    databaseURL: "https://crud-prueba-citixen.firebaseio.com",
    projectId: "crud-prueba-citixen",
    storageBucket: "crud-prueba-citixen.appspot.com",
    messagingSenderId: "109721372796",
    appId: "1:109721372796:web:f32e286178ac4f2e60e1f9"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();