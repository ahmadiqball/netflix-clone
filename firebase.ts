// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASvAImab1j6dZCBE2azdZ6QXNrM8uniB8",
  authDomain: "netflix-clone-bfbfc.firebaseapp.com",
  projectId: "netflix-clone-bfbfc",
  storageBucket: "netflix-clone-bfbfc.appspot.com",
  messagingSenderId: "1014799865929",
  appId: "1:1014799865929:web:705bd57b05c218fe6c8798"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }