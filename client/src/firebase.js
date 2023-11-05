// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyB4uk9cHa2ks8qmCMseyJXNEZyy7E6t1AE",
  authDomain: "mern-estate-85046.firebaseapp.com",
  projectId: "mern-estate-85046",
  storageBucket: "mern-estate-85046.appspot.com",
  messagingSenderId: "816915552780",
  appId: "1:816915552780:web:3d626d30738df16e65ec29",
  measurementId: "G-7TKK5L80FN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);