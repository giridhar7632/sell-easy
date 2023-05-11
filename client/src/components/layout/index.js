import { useWishlist } from '@/hooks/useWishlist'
import WishlistSidebar from '../Wishlist'
import Footer from './Footer'
import Meta from './Meta'
import Navbar from './Navbar'
import { useEffect } from 'react'
import ChatSidebar from '../Chat'
import { useChat } from '@/hooks/useChat'
// import Sidebar from './Sidebar'

const Layout = ({ meta, children, ...props }) => {
  const { wishlistOpen, toggleWishlist } = useWishlist()
  const { chatOpen, toggleChat } = useChat()

  return (
    <div className="max-w-screen min-h-screen">
      <Meta {...meta} />
      <div className="mx-auto flex min-h-screen w-[100%] max-w-screen-xl flex-col px-2 lg:px-6 xl:px-4">
        {/* <Sidebar /> */}
        <Navbar toggleWishlist={toggleWishlist} />
        <main className="flex-1 px-4 py-2 md:px-6 lg:px-4 xl:px-0" {...props}>
          {children}
        </main>
        <Footer />
      </div>
      <WishlistSidebar open={wishlistOpen} toggle={toggleWishlist} />
      <ChatSidebar open={chatOpen} toggle={toggleChat} />
    </div>
  )
}

export default Layout
