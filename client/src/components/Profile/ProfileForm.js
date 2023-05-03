import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import FormSection from '@/components/FormSection'
import ImageUpload from '../ProductForm/ImageUpload'

export function ProfileForm({ onFormSubmit, defaultValues, type = 'Create' }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (defaultValues) {
      setValue('name', defaultValues.name)
      setValue('email', defaultValues.email)
      setValue('phoneNumber', defaultValues.phoneNumber)
      setValue('address.hostel', defaultValues.address.hostel)
      setValue('address.room', defaultValues.address.room)
      setValue('address.branch', defaultValues.address.branch)
      if (defaultValues?.socials) {
        setValue('socials.facebook', defaultValues.socials?.facebook || '')
        setValue('socials.instagram', defaultValues.socials?.instagram || '')
        setValue('socials.twitter', defaultValues.socials?.twitter || '')
      }
      setValue('profileImage', defaultValues?.profileImage || '')
    }
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    await onFormSubmit(data)
    setIsLoading(false)
  })

  return (
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
          disabled={type === 'Update'}
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
        {!(type === 'Update') && (
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
        )}
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
        <ImageUpload
          defaultValue={defaultValues?.profileImage}
          key={'profileImage'}
          setValue={setValue}
        />
      </FormSection>

      <Button
        type="button"
        className={'mt-4'}
        onClick={onSubmit}
        loading={isLoading}
        loadingText={type ? `${type}ing your profile...` : 'Submitting...'}
      >
        {type ? `${type} my profile` : 'Submit'}
      </Button>
    </form>
  )
}
