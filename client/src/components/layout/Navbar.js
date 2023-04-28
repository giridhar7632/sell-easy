import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'

const Navbar = () => {
  const { isAuth } = useAuth()

  // useEffect(() => {
  //   const handleLogout = () => {
  //     localStorage.removeItem('token')
  //     window.location.reload()
  //   }

  //   if (!isAuth) {
  //     handleLogout()
  //   }

  //   window.addEventListener('storage', handleLogout)

  //   return () => window.removeEventListener('storage', handleLogout)
  // }, [isAuth])

  return (
    <nav className="relative my-2 flex flex-wrap items-center justify-between rounded-lg bg-white bg-opacity-10 py-4 shadow-sm backdrop-blur-sm">
      <div className="container-fluid flex w-full flex-wrap items-center justify-between px-6">
        <div className="container-fluid">
          <Link href="/">
            <Image src="/logo.png" height={44} width={112.63} alt="Sell Easy" loading="lazy" />{' '}
          </Link>
        </div>
        {isAuth && (
          <Button
            variant="text"
            onClick={() => {
              localStorage.removeItem('token')
              // window.location.reload()
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
