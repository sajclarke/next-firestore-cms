// import db from "@utils/adminApp";
// import type { NextApiRequest, NextApiResponse } from 'next'

import {
  firestore,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@utils/clientApp'
import {
  collection,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  getDocs,
  getDoc,
  DocumentData,
  // serverTimestamp,
} from 'firebase/firestore'
import { IFormInputs, IPost } from '../../interfaces'

type UserData = {
  email: string
  name: string
  provider: string
  photoUrl: string
  skills?: string[]
  bio?: string
}

export const uploadImage = async (file: File) => {
  // Create the file metadata

  const metadata = {
    contentType: 'image/jpeg',
  }

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name)
  // const uploadTask = uploadBytes(storageRef, file)
  return new Promise(async (resolve, reject) => {
    uploadBytesResumable(storageRef, file, metadata)
      .then((snapshot) => {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.')
        console.log('File metadata:', snapshot.metadata)
        // Let's get a download URL for the file.
        getDownloadURL(snapshot.ref).then((url: string) => {
          console.log('File available at', url)
          resolve(url.toString())
        })
      })
      .catch((error) => {
        console.error('Upload failed', error)
        reject(error.toString())
      })
  })
}

export const getAllUsers = async () => {
  try {
    const q = query(collection(firestore, 'users'))
    const response: DocumentData[] = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data())
      // const { name, email, photoUrl, provider, skills } = doc.data()
      response.push({ ...doc.data(), uid: doc.id })
      // res.status(200).json({ ...doc.data() })
    })

    return response
  } catch (e) {
    console.error('Error getting document: ', e)
  }
}

export const getUser = async (uid: string) => {
  try {
    const docSnap = await getDoc(doc(firestore, 'users', uid))
    // console.log('User created with ID: ', docRef)
    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data())
      return { ...docSnap.data() }
    } else {
      // doc.data() will be undefined in this case
      console.log('Could not find user!')
    }
  } catch (e) {
    console.error('Error finding user: ', e)
  }
}

export const createUser = async (uid: string, data: UserData) => {
  //Create user if they do not already exist
  try {
    const docSnap = await getDoc(doc(firestore, 'users', uid))
    // console.log('User created with ID: ', docRef)
    if (!docSnap.exists()) {
      await setDoc(doc(firestore, 'users', uid), { uid, ...data })
    }
    // const docRef =
    // console.log('User created with ID: ', docRef)
    return { message: 'User created successfully' }
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const updateUser = async (
  uid: string | undefined,
  data: {
    uid: string
    name: string
    userStatus: string
    githubUrl?: string
    linkedInUrl?: string
    skills?: { label: string; value: string }[]
    bio?: string
  }
) => {
  if (!uid) {
    return
  }
  //Create user if they do not already exist
  try {
    await updateDoc(doc(firestore, 'users', uid), {
      ...data,
      // updatedAt: serverTimestamp(),
    })
    // console.log('Document updated with ID: ', docRef)
    return { message: 'User updated successfully' }
  } catch (e) {
    console.error('Error updated document: ', e)
  }
}

export const getPosts = async () =>
  // req: NextApiRequest,
  // res: NextApiResponse<Data>
  {
    //Create user if they do not already exist
    try {
      const q = query(collection(firestore, 'posts'))
      const response: IPost[] = []
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        const { title, description, createdAt } = doc.data()
        response.push({ title, description, createdAt, id: doc.id })
        // res.status(200).json({ ...doc.data() })
      })

      return response
    } catch (e) {
      console.error('Error getting document: ', e)
    }
  }

export const getPost = async (postId?: string) =>
  // req: NextApiRequest,
  // res: NextApiResponse<Data>
  {
    if (!postId) {
      return
    }
    //Create user if they do not already exist
    try {
      const docRef = doc(firestore, 'posts', postId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data())
        return { ...docSnap.data() }
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

export const getWhere = async (slug?: string) => {
  if (!slug) {
    return
  }
  //Create user if they do not already exist
  try {
    // const docRef = collection(firestore, 'posts')
    // const docSnap = await getDocs(query(docRef, where('slug', '==', slug)))
    // console.log(docSnap)
    const q = query(collection(firestore, 'posts'), where('slug', '==', slug))

    const docSnap = await getDocs(q)
    // docSnap.forEach((doc) => {
    //   console.log(doc.id, ' => ', doc.data())
    //   return doc.data()
    // })
    const result: DocumentData[] = []
    docSnap.forEach((snapshot) => {
      result.push(snapshot.data())
    })
    // set it to state
    // setTodos(result)
    return result
    // if (docSnap.exists()) {
    //   // console.log('Document data:', docSnap.data())
    //   return { ...docSnap.data() }
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log('No such document!')
    // }
  } catch (e) {
    console.error('Error finding document: ', e)
  }
}

export const addPost = async (data: IFormInputs) =>
  // req: NextApiRequest,
  // res: NextApiResponse<Data>
  {
    try {
      const docRef = await addDoc(collection(firestore, 'posts'), {
        ...data,
        createdAt: new Date().toLocaleDateString(),
      })
      console.log('Post created with id: ', docRef)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

export const updatePost = async (data: IFormInputs) =>
  // req: NextApiRequest,
  // res: NextApiResponse<Data>
  {
    if (!data.id) {
      return
    }

    try {
      const docRef = await updateDoc(doc(firestore, 'posts', data.id), {
        ...data,
      })
      console.log('Post created with id: ', docRef)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
