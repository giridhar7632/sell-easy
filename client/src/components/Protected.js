import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/hooks/useAuth'
import Loader from './common/Loader'
import Meta from './layout/Meta'
import { titleCase } from '@/utils/titleCase'

const Protected = ({ protectedRoutes, children }) => {
  const router = useRouter()
  const name = titleCase(router.pathname.slice(1))
  const { isAuth, isLoading } = useAuth()

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1

  useEffect(() => {
    if (!isLoading && !isAuth && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuth, pathIsProtected])

  if ((isLoading || !isAuth) && pathIsProtected) {
    return (
      <>
        <Meta meta={{ name }} />
        <Loader />
      </>
    )
  }

  return children
}

export default Protected
