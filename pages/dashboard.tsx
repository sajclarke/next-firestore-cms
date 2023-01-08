import React, { ReactElement } from 'react'
import Head from 'next/head'
import Layout from '@components/layouts/AdminWrapper'
import { useRouter } from 'next/router'
import { useAuth } from '@context/authContext'

export default function Dashboard() {
  //   const router = useRouter()
  //   const authContext = React.useContext(AuthContext)

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <h2>Dashboard</h2>
        {/* <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Sign Out
        </button> */}
      </div>
    </React.Fragment>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  const authContext = useAuth()
  const router = useRouter()
  React.useEffect(() => {
    // checks if the user is authenticated
    console.log(authContext.loading)
    console.log(authContext.isUserAuthenticated(), authContext.user)
    if (!authContext.loading && !authContext.isUserAuthenticated()) {
      router.push('/login')
    }
  }, [authContext.loading])
  const handleSignOut = () => {
    console.log('logging out', authContext)
    authContext.logout()
  }
  return <Layout onSignOut={handleSignOut}>{page}</Layout>
}
