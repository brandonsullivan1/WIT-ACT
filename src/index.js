// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-031PTQ3LtcYInfDg5ULka_vxTarWsRY",
  authDomain: "wit-act-86ff3.firebaseapp.com",
  databaseURL: "https://wit-act-86ff3-default-rtdb.firebaseio.com",
  projectId: "wit-act-86ff3",
  storageBucket: "wit-act-86ff3.appspot.com",
  messagingSenderId: "1049459809173",
  appId: "1:1049459809173:web:71b447adcab4a5a443b49c",
  measurementId: "G-2QEL8MYZ1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);