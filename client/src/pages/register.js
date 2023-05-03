import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Link from '@/components/common/Link'
import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import { ProfileForm } from '../components/Profile/ProfileForm'

const Register = () => {
  const { isAuth, register: registerUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      router.replace('/explore')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])

  return (
    <Layout meta={{ name: 'Register' }}>
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 w-max text-clip text-2xl font-bold">Register</h1>
        {/* {status ? (
          <div className="mb-2 rounded-sm bg-red-50 p-2 text-center ring-2 ring-red-200">
            {status}
          </div>
        ) : null} */}
        <ProfileForm isLoading={isLoading} onFormSubmit={registerUser} />

        <div className="my-6">
          {'Already have a profile?'} <Link href={'login'}>Login</Link>
        </div>
      </div>
    </Layout>
  )
}

export default Register
