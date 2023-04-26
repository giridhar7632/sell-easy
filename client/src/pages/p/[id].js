import Image from 'next/image'
import { useState, useEffect } from 'react'

import { Facebook, Instagram, Twitter } from '@/components/icons'
import Link from '@/components/common/Link'
import Layout from '@/components/layout'
import { useAuth } from '@/utils/useAuth'

const Product = ({ profile, message, type }) => {
  const [links, setLinks] = useState(profile?.links || [])
  const { user, isAuth } = useAuth()
  const handleAddLink = async (data) => {
    console.log(data)
  }

  useEffect(() => {
    profile?.links && setLinks(profile.links)
  }, [profile])

  if (type !== 'success')
    return (
      <Layout>
        <div className={'w-full text-center text-2xl font-bold text-gray-400'}>{message}</div>
      </Layout>
    )

  return (
    <Layout meta={{ name: profile?.name }}>
      <h1>Product</h1>
    </Layout>
  )
}

export default Product

export async function getStaticProps({ params }) {
  try {
    return {
      props: { profile: {}, type: 'success' },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

export async function getStaticPaths() {
  const profiles = [{ id: '1' }, { id: '2' }, { id: '3' }]
  return {
    paths: profiles.map((item) => ({
      params: { id: item.id },
    })),
    fallback: true,
  }
}
