import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Link from '@/components/common/Link'
import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout'

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const router = useRouter()
  const { isLoading, resetPassword } = useAuth()

  const onFormSubmit = handleSubmit(async (data) => {
    await resetPassword(router.query, data)
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
            label={'Password'}
            type="password"
            name="password"
            placeholder={`Your Super secret ✨`}
            aria-label="user-password"
            register={register('newPassword', {
              required: `Password is required!`,
            })}
            error={errors?.password}
          />
          <Button
            className={'mt-4 w-full'}
            loading={isLoading}
            loadingText={'Updating Password...'}
            onClick={onFormSubmit}
            disabled={!router.isReady}
          >
            Update Password
          </Button>
        </form>
        <div className="mt-6">
          {"Don't have an account?"} <Link href={'register'}>Register now</Link>
        </div>
      </div>
    </Layout>
  )
}

export default ResetPassword
