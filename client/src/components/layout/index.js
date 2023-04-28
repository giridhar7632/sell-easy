import Footer from './Footer'
import Meta from './Meta'
import Navbar from './Navbar'
// import Sidebar from './Sidebar'

const Layout = ({ meta, children, ...props }) => {
  return (
    <div className="max-w-screen min-h-screen">
      <Meta {...meta} />
      <div className="mx-auto flex min-h-screen w-[100%] max-w-screen-lg flex-col">
        {/* <Sidebar /> */}
        <Navbar />
        <main className="flex-1 px-4 py-2 md:px-6" {...props}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
