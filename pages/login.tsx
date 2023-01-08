import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '@context/authContext'

import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  //   const authContext = React.useContext(AuthContext)
  const authContext = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: 'shannonajclarke@gmail.com', password: 'shannon' },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    const { email, password } = data
    authContext.login({ email, password })
  }

  React.useEffect(() => {
    // checks if the user is authenticated
    console.log(authContext)
    console.log(authContext.isUserAuthenticated())
    if (!authContext.loading && authContext.isUserAuthenticated()) {
      router.push('/dashboard')
    }
    // authContext.isUserAuthenticated()
    //   ? router.push('/')
    //   : router.push('/dashboard')
  }, [authContext.user])

  return (
    <React.Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <div className="mx-auto max-w-md">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span>Email address</span>
            <input type="email" {...register('email')} />
          </label>

          <label className="block">
            <span>Password</span>
            <input type="password" {...register('password')} />
          </label>

          <button
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}
