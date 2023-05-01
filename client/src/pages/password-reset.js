import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Link from '@/components/common/Link'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm()
  const router = useRouter()
  const { isAuth, isLoading, sendPasswordResetEmail } = useAuth()
  useEffect(() => {
    if (router.isReady) {
      setValue('email', router.query.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isLoading])

  const onFormSubmit = handleSubmit(async (data) => {
    await sendPasswordResetEmail(data)
    // router.push('/login')
  })

  return (
    <Layout meta={{ name: 'Password Reset' }}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <form className="w-96 max-w-xl rounded-xl border bg-white p-12 text-base shadow-sm">
          <h1 className="mb-6 w-max text-clip text-2xl font-bold">Password Reset</h1>
          {/* {status ? (
            <div className="mb-2 rounded-sm bg-red-50 p-2 text-center ring-2 ring-red-200">
              {status}
            </div>
          ) : null} */}
          <Input
            label={'Email'}
            name={'email'}
            type="email"
            required
            placeholder="your@email.com"
            aria-label="user-email"
            autoComplete="current-email"
            register={register('email', {
              required: `Email is required!`,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Invalid email address!',
              },
            })}
            error={errors?.email}
          />
          <Button
            className={'mt-4 w-full'}
            loading={isLoading}
            loadingText={'Sending Password Reset Email...'}
            onClick={onFormSubmit}
          >
            Send Password Reset Email
          </Button>
        </form>
        <div className="mt-6">
          {"Don't have an account?"} <Link href={'register'}>Register now</Link>
        </div>
      </div>
    </Layout>
  )
}

export default PasswordReset
