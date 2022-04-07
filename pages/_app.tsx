import '../styles/globals.css'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 500,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SWRConfig>
  )
}

export default MyApp
