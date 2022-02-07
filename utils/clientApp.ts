import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
})
// import { getFirestore } from 'firebase/firestore'
const firestore = getFirestore()
const auth = getAuth()

const storage = getStorage(firebaseApp)

// await setPersistence(auth, browserSessionPersistence)

// export { firestore, auth }
export {
  firestore,
  auth,
  storage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
}
