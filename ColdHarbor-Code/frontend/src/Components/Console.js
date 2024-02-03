// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {GoogleAuthProvider,getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz1q_xUgz4y24TIeulmpgiiE7vtX2G9wo",
  authDomain: "crp-csms.firebaseapp.com",
  projectId: "crp-csms",
  storageBucket: "crp-csms.appspot.com",
  messagingSenderId: "436921619571",
  appId: "1:436921619571:web:68ca3ddb821e2ad11ec606",
  measurementId: "G-2WF9XPSDTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleprovider=new GoogleAuthProvider();