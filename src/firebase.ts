import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* Google Auth import */
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { log } from "console";

// thay config thành config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCPtz_pFk22fsj3MrXtt9QV7ddNuFjXBW8",
  authDomain: "cakerun-d9db6.firebaseapp.com",
  projectId: "cakerun-d9db6",
  storageBucket: "cakerun-d9db6.appspot.com",
  messagingSenderId: "297962726880",
  appId: "1:297962726880:web:da13993e80c89a76153785",
  measurementId: "G-KGGY4876FF"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(file: File, folderName: string) {

  if (!file) {
    return false
  }
  const fileRef = ref(storage, `${folderName}/` + file.name);

  let url = await uploadBytes(fileRef, file).then(async res => {
    return await getDownloadURL(res.ref)
      .then(url => url)
      .catch(er => false)
  })

  return url
}

/* google auth import */
const googleProvider = new GoogleAuthProvider();
export async function googleLogin() {
  let auth = getAuth(app)
  return await signInWithPopup(auth, googleProvider)

}
