import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CommentsList from '@/components/Profile/CommentsList'
import ProductsList from '@/components/Profile/ProductList'
import { ProfileForm } from '@/components/Profile/ProfileForm'
import ReviewList from '@/components/Reviews/ReviewList'
import Loader from '@/components/common/Loader'
import { Email, Facebook, Instagram, Twitter } from '@/components/icons'
import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import useFetcher from '@/hooks/useFetcher'
import { Tab } from '@headlessui/react'
import useToast from '@/hooks/useToast'

const IconBtn = ({ children, ...props }) => (
  <Link
    className="rounded-full bg-teal-100 p-2 text-teal-500 ring-0 hover:text-teal-600 hover:ring hover:ring-teal-200 disabled:bg-teal-100 disabled:ring-0"
    {...props}
  >
    {children}
  </Link>
)

const Profile = () => {
  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState('')
  const { user, isAuth } = useAuth()
  const toast = useToast()
  const router = useRouter()
  const fetcher = useFetcher()
  const fetchProfile = async (id) => {
    if (isAuth) {
      try {
        const res = await fetcher(`/api/users/${id}`, { token: isAuth })
        setProfile(res)
      } catch (error) {
        console.log(error)
        error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
      }
    }

    setIsLoading(false)
  }

  const onFormSubmit = async (data) => {
    try {
      const res = await fetcher(`/api/users/me`, { token: isAuth, method: 'PUT', body: data })
      toast.open({ message: res.message, type: 'success' })
      setProfile(res.user)
    } catch (error) {
      console.log(error)
      error?.message
        ? toast.open(error)
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
  }

  useEffect(() => {
    if (router.isReady) {
      // wait until router.query is defined
      if (router.query.id === 'me') {
        setIsLoading(false)
        setProfile(user)
      } else {
        // fetchProfile(router.query.id)
        fetchProfile(router.query.id)
        console.log(router.query)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id])

  const tabs = {
    Reviews: <ReviewList reviews={profile?.reviews || []} userId={profile?._id} />,
    Products: <ProductsList token={isAuth} userId={profile?._id} />,
    ...(router.query.id === 'me'
      ? {
          Comments: <CommentsList token={isAuth} />,
          'Edit Profile': (
            <ProfileForm type={'Update'} onFormSubmit={onFormSubmit} defaultValues={user} />
          ),
        }
      : {}),
  }

  return (
    <Layout meta={{ name: profile?.name || 'Profile' }}>
      {isLoading ? (
        <Loader />
      ) : status ? (
        <div className={'w-full text-center text-2xl font-bold text-gray-300'}>{status}</div>
      ) : (
        <div className="mx-auto flex max-w-lg flex-col">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={profile?.profileImage || `https://api.multiavatar.com/${profile?.name}.png`}
              width={100}
              height={100}
              className={'mb-2 rounded-full'}
              alt={profile?.name || ''}
              loading={'lazy'}
              placeholder={'blur'}
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <h1 className="text-xl font-bold">{profile?.name}</h1>
          </div>

          <div className="my-4 mx-auto flex max-w-xs items-center justify-around gap-3">
            <IconBtn href={profile?.email}>
              <Email width={24} />
            </IconBtn>
            {profile?.socials && (
              <>
                <IconBtn href={profile?.socials.twitter} target={'_blank'}>
                  <Twitter width={24} />
                </IconBtn>
                <IconBtn href={profile?.socials.instagram} target={'_blank'}>
                  <Instagram width={24} />
                </IconBtn>
                <IconBtn href={profile?.socials.facebook} target={'_blank'}>
                  <Facebook width={24} />
                </IconBtn>
              </>
            )}
          </div>

          <Tab.Group as={'div'} className="w-full max-w-3xl  px-2 sm:px-0">
            <Tab.List className="flex space-x-1 rounded-xl border border-gray-200 p-1">
              {Object.keys(tabs).map((tab, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    clsx(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'text-teal-500 ring-teal-200 focus:outline-none focus:ring-2',
                      selected && 'bg-teal-100 text-teal-600'
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className={'mt-2'}>
              {Object.values(tabs).map((tab, idx) => (
                <Tab.Panel
                  key={idx}
                  className={clsx('rounded-xl bg-white p-3', 'focus:outline-none')}
                >
                  {tab}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </Layout>
  )
}

export default Profile

// export async function getStaticProps({ params }) {
//   try {
//     // getting user profile
//     const res = await fetch(`http://localhost:5000/api/users/${params.id}`)
//     return {
//       // sending user data as props
//       props: { profile: res },
//       revalidate: 10,
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       props: { message: 'User not found! 😕', type: 'error' },
//     }
//   }
// }

// export async function getStaticPaths() {
//   const users = ['644b9943abb40e22051e672a', '644bb98031828d3660be9c60', '644c3113448c4be41580d7f5']
//   return {
//     paths: users,
//     fallback: true,
//   }
// }
