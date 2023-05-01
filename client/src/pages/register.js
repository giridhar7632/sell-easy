import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Link from '@/components/common/Link'
import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import FormSection from '@/components/FormSection'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { isAuth, register: registerUser, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])

  const onFormSubmit = handleSubmit(async (data) => {
    await registerUser(data)
    router.replace('/login')
  })

  return (
    <Layout meta={{ name: 'Register' }}>
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 w-max text-clip text-2xl font-bold">Register</h1>
        {/* {status ? (
          <div className="mb-2 rounded-sm bg-red-50 p-2 text-center ring-2 ring-red-200">
            {status}
          </div>
        ) : null} */}
        <form>
          <FormSection defaultOpen={true} title={'Credentials'}>
            <Input
              label="Nick Name"
              name="name"
              type="text"
              placeholder="Space mozarat"
              aria-label="username"
              autoComplete="current-name"
              autoFocus
              register={register('name', {
                minLength: {
                  value: 3,
                  message: `Your nick name must be at least 3 characters!`,
                },
              })}
              error={errors?.name}
            />
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
            <Input
              label={'Phone number'}
              name={'phone'}
              type="email"
              required
              placeholder="+91 1234567890"
              aria-label="user-phone"
              autoComplete="current-email"
              register={register('phoneNumber', {
                required: `Phone number is required!`,
              })}
              error={errors?.phoneNumber}
            />
            <Input
              label={'Password'}
              type="password"
              name="password"
              placeholder={`Super secret ✨ - minimum 8 characters`}
              aria-label="user-password"
              register={register('password', {
                required: `Password is required!`,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                },
                minLength: {
                  value: 8,
                  message: 'Password should be atleast 8 characters long!',
                },
              })}
              error={errors?.password}
            />
          </FormSection>

          {/* Address */}
          <FormSection title={'Address'}>
            <p className="text-xs text-gray-600">Enter your address</p>
            <Input
              name="Room no."
              type="text"
              placeholder="Room number (A 123)"
              error={errors?.address?.room}
              register={register('address.room', {
                required: `Room no is required!`,
              })}
            />
            <Input
              name="Hostel"
              type="text"
              placeholder="Hostel (H 8)"
              error={errors?.address?.hostel}
              register={register('address.hostel', {
                required: `Hostel no is required!`,
              })}
            />
            <Input
              name="Branch"
              type="text"
              placeholder="Branch (Electronics ...)"
              error={errors?.address?.branch}
              register={register('address.branch', {
                required: `Hostel no is required!`,
              })}
            />
          </FormSection>

          {/* Social media links */}
          <FormSection title={'Social media'}>
            <p className="text-xs text-gray-600">Enter your social media urls</p>
            <Input
              name="facebook"
              type="link"
              placeholder="Facebook"
              register={register('socials.facebook')}
            />
            <Input
              name="instagram"
              type="link"
              placeholder="Instagram"
              register={register('socials.instagram')}
            />
            <Input
              name="twitter"
              type="link"
              placeholder="Twitter"
              register={register('socials.twitter')}
            />
          </FormSection>

          {/* Links media links */}
          <FormSection title={'Profile Image'}>
            <Button
              variant={'text'}
              className="my-2 w-full"
              type={'button'}
              // onClick={() => append({ title: '', link: '' })}
            >
              + Upload Image
            </Button>
          </FormSection>

          <Button
            loading={isLoading}
            loadingText={'Creating your profile...'}
            className={'mt-4'}
            onClick={onFormSubmit}
          >
            Create my profile
          </Button>
        </form>

        <div className="my-6">
          {'Already have a profile?'} <Link href={'login'}>Login</Link>
        </div>
      </div>
    </Layout>
  )
}

export default Register
