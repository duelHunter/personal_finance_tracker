// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6ORY7Lj1v2EWhPU1343pOvqDXh1Pi2Og",
  authDomain: "money-tracker-5a927.firebaseapp.com",
  projectId: "money-tracker-5a927",
  storageBucket: "money-tracker-5a927.appspot.com",
  messagingSenderId: "388498932356",
  appId: "1:388498932356:web:01994831419a5c2dab78d1",
  measurementId: "G-0FTCFK4FBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = app.auth();
// export default firebaseConfig;


const auth = getAuth(app);
export { auth };
export const provider = new GoogleAuthProvider();