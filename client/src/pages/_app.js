import Protected from '@/components/Protected'
import { AuthProvider } from '@/hooks/useAuth'
import { ToastProvider } from '@/hooks/useToast'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const protectedRoutes = ['/explore', '/user/[id]']
  // const protectedRoutes = []

  return (
    <ToastProvider>
      <AuthProvider>
        <Protected protectedRoutes={protectedRoutes}>
          {getLayout(<Component {...pageProps} />)}
        </Protected>
      </AuthProvider>
    </ToastProvider>
  )
}
