import Protected from '@/components/Protected'
import { AuthProvider } from '@/hooks/useAuth'
import { CategoryProvider } from '@/hooks/useCategories'
import { ToastProvider } from '@/hooks/useToast'
import { WishlistProvider } from '@/hooks/useWishlist'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const protectedRoutes = ['/explore', '/user/[id]']
  // const protectedRoutes = []

  return (
    <ToastProvider>
      <AuthProvider>
        <CategoryProvider>
          <WishlistProvider>
            <Protected protectedRoutes={protectedRoutes}>
              {getLayout(<Component {...pageProps} />)}
            </Protected>
          </WishlistProvider>
        </CategoryProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
