import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedNavLink } from '@/components/common/Link'
import { ChevronRight } from '@/components/icons'
import Meta from '@/components/layout/Meta'
import { useAuth } from '@/hooks/useAuth'

export default function Index() {
  const { isAuth, isLoading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!isLoading && isAuth) {
      router.replace('/explore')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isLoading])

  return (
    <div
      className={
        "max-w-screen relative flex min-h-screen min-w-full flex-col bg-[url('/background.png')] bg-cover bg-clip-border bg-left-bottom bg-no-repeat"
      }
    >
      <Meta />
      <nav className="z-10 mx-auto flex w-full max-w-screen-lg items-center justify-between px-4 py-4 lg:px-0">
        <Link className="text-lg" href={'/'}>
          <Image src={'/logo.png'} alt={'Sell easy'} width={112.63} height={44} />
        </Link>
        <div className="btn-group flex flex-row items-center gap-4">
          <AnimatedNavLink href="/explore">Explore</AnimatedNavLink>
          <AnimatedNavLink href="/buy">Buy</AnimatedNavLink>
          <AnimatedNavLink href="/sell">Sell</AnimatedNavLink>
          <Link href={'/login'}>
            <button className="flex flex-row items-center gap-2 rounded-full bg-black px-6 py-3  transition-all duration-300 hover:gap-3">
              <span className="font-semibold text-white">Login</span>
              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0v-2z" />
              </svg>
            </button>
          </Link>
        </div>
      </nav>
      <main className="mx-auto flex max-w-screen-lg flex-1 items-center justify-center px-4 lg:px-0">
        <div>
          <div className="mx-auto">
            <h1 className="mb-6 text-6xl font-semibold tracking-tight">
              Helping you sell or buy products online with ease
            </h1>
            <p className="mb-8 text-lg text-gray-800">
              A powerful e-commerce platform that makes it simple to buy, create and manage your
              online store.
            </p>
            <div className={'flex items-center gap-6'}>
              <Link href={'/register'}>
                <button className="flex flex-row items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition-all duration-300 hover:gap-3">
                  <span>Get Started</span>
                  <ChevronRight width={24} />
                </button>
              </Link>

              <Link href={'/contact'}>
                <button className="rounded-full bg-teal-400/20 px-6 py-3 font-semibold text-teal-500 backdrop-blur-sm hover:text-teal-600">
                  Contact
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={'hidden w-[80%] md:block'}>
          <Image height={300} width={300} src={'/logo.png'} alt={'sell easy'} />
        </div>
      </main>
      {/* <Footer type={'hero'} /> */}
    </div>
  )
}
