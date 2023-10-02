import { initializeApp } from "firebase/app";

/* Google Auth */
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// thay config thành config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyB_AARpq4JC8whGk51oWfCLLgTOfKjBdjo",
  authDomain: "md5lancome-53ee0.firebaseapp.com",
  projectId: "md5lancome-53ee0",
  storageBucket: "md5lancome-53ee0.appspot.com",
  messagingSenderId: "634280478032",
  appId: "1:634280478032:web:fc48e9153c33207b8b1855",
  measurementId: "G-Y2FEJ9KYMF"
};

const app = initializeApp(firebaseConfig);

/* google auth import */
const googleProvider = new GoogleAuthProvider();
export async function googleLogin() {
  let auth = getAuth(app)
  return await signInWithPopup(auth, googleProvider)

}
