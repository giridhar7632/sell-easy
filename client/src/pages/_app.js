import { AuthProvider } from '@/hooks/useAuth'
import { ToastProvider } from '@/hooks/useToast'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ToastProvider>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ToastProvider>
  )
}
