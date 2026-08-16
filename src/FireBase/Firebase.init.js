// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyCxdlHTDybUtSSNOnn5HCIPHIK2TJgpXn8",
      authDomain: "posakbari-840cd.firebaseapp.com",
      projectId: "posakbari-840cd",
      storageBucket: "posakbari-840cd.firebasestorage.app",
      messagingSenderId: "360645824541",
      appId: "1:360645824541:web:5eeecafe72029da48f76f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);