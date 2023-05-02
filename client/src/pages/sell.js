import ProductForm from '@/components/ProductForm'
import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import useFetcher from '@/hooks/useFetcher'
import useToast from '@/hooks/useToast'
import { useRouter } from 'next/router'
import React from 'react'

const Sell = () => {
  const { isAuth, user } = useAuth()
  const fetcher = useFetcher()
  const router = useRouter()
  const toast = useToast()

  const onFormSubmit = async (data) => {
    try {
      const res = await fetcher(`/api/products`, {
        token: isAuth,
        body: { ...data, seller: user?._id },
      })
      toast.open(res)
      router.push(`/product/${res.product._id}`)
    } catch (error) {
      error?.message
        ? toast.open({ message: error.message, type: 'error' })
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
  }
  return (
    <Layout meta={{ name: 'Sell product' }}>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="my-4 text-clip text-3xl font-bold md:text-5xl">Sell products</h1>
        <p className="text-md">Add products to make them discoverable around the campus!</p>
      </div>
      <div className={'mx-auto my-10 max-w-xl lg:my-16'}>
        <ProductForm type={'Add'} onFormSubmit={onFormSubmit} />
      </div>
    </Layout>
  )
}

export default Sell
