import Button from '@/components/common/Button'
import Loader from '@/components/common/Loader'
import { Email, Facebook, Instagram, Twitter } from '@/components/icons'
import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import { fetcher } from '@/utils/fetcher'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
  const router = useRouter()

  // const fetchProfile = async (id) => {
  //   try {
  //     const res = await fetcher(`/api/users/${id}`)
  //     console.log(res)
  //     // setProfile(res)
  //   } catch (error) {
  // console.log(error)
  // error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const fetchProfile = async (id) => {
    if (isAuth) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${isAuth}`,
          },
        })
        const data = await res.json()
        console.log(data)
        setProfile(data)
      } catch (error) {
        console.log(error)
        error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
      }
    }

    setIsLoading(false)
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

  return (
    <Layout meta={{ name: profile?.name || 'Profile' }}>
      {isLoading ? (
        <Loader />
      ) : status ? (
        <div className={'w-full text-center text-2xl font-bold text-gray-400'}>{status}</div>
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

          <div className="my-4 mx-auto flex max-w-xs items-center justify-around">
            <IconBtn href={profile?.email}>
              <Email width={24} />
            </IconBtn>
            {profile?.socials && (
              <>
                <IconBtn href={profile?.socials.twitter}>
                  <Twitter width={24} />
                </IconBtn>
                <IconBtn href={profile?.socials.instagram}>
                  <Instagram width={24} />
                </IconBtn>
                <IconBtn href={profile?.socials.facebook}>
                  <Facebook width={24} />
                </IconBtn>
              </>
            )}
          </div>

          {/* <div className="flex flex-col">
          <h2 className="mb-2 text-gray-500">Links</h2>
          {links.length < 10 && user === profile?.id ? (
            <LinkForm className={'mb-2 w-full'} title={'Add Link'} onFormSubmit={handleAddLink}>
              + Add Link
            </LinkForm>
          ) : (
            ''
          )}
          <ul>
            {links.map((i, idx) => (
              <ProfileLink
                key={idx}
                setLinks={setLinks}
                own={user === profile?.id}
                token={isAuth}
                {...i}
              />
            ))}
          </ul>
        </div> */}
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
