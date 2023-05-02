import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'
import { Cart, Heart } from '../icons'
import Avatar from '../Profile/Avatar'
import { AnimatedNavLink } from '../common/Link'

const Navbar = ({ toggleWishlist }) => {
  const { isAuth, logout, user } = useAuth()

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
      <div className="container-fluid flex w-full flex-wrap items-center justify-between px-3 md:px-6">
        <div className="container-fluid">
          <Link href="/">
            <Image src="/logo.png" height={44} width={112.63} alt="Sell Easy" loading="lazy" />{' '}
          </Link>
        </div>
        {isAuth && (
          <div className="flex items-center gap-4">
            {/* <Button variant="secondary">
              Your Cart
              <Cart width={18} height={18} />
            </Button> */}
            <AnimatedNavLink href={'/buy'}>Buy</AnimatedNavLink>
            <AnimatedNavLink href={'/sell'}>Sell</AnimatedNavLink>
            <Button variant="secondary" onClick={toggleWishlist}>
              Wishlist
              <Heart width={18} height={18} />
            </Button>
            <Avatar logout={logout} {...user} />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
