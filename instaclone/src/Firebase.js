// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5aQZ1FwaIf-HRP1Q3yUyYfyIz_Nh5O_U",
  authDomain: "instacloneuserdata.firebaseapp.com",
  projectId: "instacloneuserdata",
  storageBucket: "instacloneuserdata.appspot.com",
  messagingSenderId: "715511910149",
  appId: "1:715511910149:web:b846774f9c72d5b8faf16c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
