import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { TrpcPages } from '../utils/trpc'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default TrpcPages.withTRPC(App)