import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { DocumentData } from '@firebase/firestore'
import {
  GithubAuthProvider,
  signInWithPopup,
  // getAuth,
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  onIdTokenChanged,
} from 'firebase/auth'
import { auth } from '@utils/clientApp'
import nookies from 'nookies'
// import { firebaseAdmin } from '@utils/adminApp'
import { createUser } from '../pages/api/db'
import { IUser } from '@interfaces/index'

import Loading from '@components/Loading'

type authContextType = {
  user: IUser | null
  loading: boolean
  isUserAuthenticated: () => boolean
  login: ({ email, password }) => void
  logout: () => void
}

type Props = {
  children: ReactNode
}

const authContextDefaultValues: authContextType = {
  user: null,
  loading: true,
  isUserAuthenticated: () => false,
  login: () => {
    // any clear comments.
  },
  logout: () => {
    // any clear comments.
  },
}
const AuthContext = createContext<authContextType>(authContextDefaultValues)

// Inside AuthProvider
const provider = new GithubAuthProvider()

//Custom hook to use throughout the app
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const formatUser = async (user: DocumentData) => {
    const token = await user.getIdToken()
    // console.log(user)
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
      token,
    }
  }

  useEffect(() => {
    return onIdTokenChanged(auth, async (rawUser) => {
      if (!rawUser) {
        setUser(null)
        nookies.set(undefined, 'token', '', { path: '/' })
        setLoading(false)
      } else {
        const user = await formatUser(rawUser)
        const { token, ...userWithoutToken } = user

        // createUser(user.uid, { ...userWithoutToken, skills: [] })
        setUser(userWithoutToken)
        console.log(user)
        setLoading(false)
        nookies.set(undefined, 'token', token, { path: '/' })
      }
    })
  }, [])

  // force refresh the token every 10 minutes
  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     const user = auth.currentUser
  //     if (user) await user.getIdToken(true)
  //   }, 10 * 60 * 1000)

  //   // clean up setInterval
  //   return () => clearInterval(handle)
  // }, [])

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    console.log(auth.currentUser)

    const user = auth.currentUser
    // console.log(await user?.getIdToken(true))
    // if (user) return await user.getIdToken(true)
    if (user) return true
    return false
  }

  const login = ({ email, password }) => {
    console.log('logging in....')
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
        console.log(user, userCredential)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
        console.error(error)
      })

    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GithubAuthProvider.credentialFromResult(result)
    //     const token = credential?.accessToken
    //     // The signed-in user info.
    //     const user = result.user
    //     console.log({ credential, token, user })
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code
    //     const errorMessage = error.message
    //     // The email of the user's account used.
    //     const email = error.email
    //     // The AuthCredential type that was used.
    //     const credential = GithubAuthProvider.credentialFromError(error)
    //     console.log({ errorCode, errorMessage, email, credential })
    //   })
  }

  const logout = () => {
    console.log('logout')
    auth.signOut()
  }

  const value = {
    user,
    isUserAuthenticated,
    loading,
    login,
    logout,
  }

  if (loading) return <Loading />

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
