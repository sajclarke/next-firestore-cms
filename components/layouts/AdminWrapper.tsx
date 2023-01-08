import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@context/authContext'

export default function Layout(props) {
  console.log(props)
  const { children, onSignOut } = props
  //   const { data, error } = useSWR('/api/navigation', fetcher)
  //   const router = useRouter()
  //   //   if (error) return <div>Failed to load</div>
  //   //   if (!data) return <div>Loading...</div>
  //   const authContext = useAuth()

  //   React.useEffect(() => {
  //     // checks if the user is authenticated
  //     console.log(authContext)
  //     console.log(authContext.isUserAuthenticated())
  //     // if (!authContext.isUserAuthenticated()) {
  //     //   router.push('/login')
  //     // }
  //   }, [authContext])

  //   const onSignOut = () => {
  //     console.log('test')
  //     //   authContext.logout()
  //   }

  return (
    <div className="h-screen flex flex-col bg-red-100">
      {/* <Navbar links={data.links} /> */}
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Next CMS - Admin</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">First Link</a>
            <a className="mr-5 hover:text-gray-900">Second Link</a>
            <a className="mr-5 hover:text-gray-900">Third Link</a>
            <a className="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">{children}</main>
      <footer>Footer</footer>
      {/* <Footer /> */}
    </div>
  )
}
