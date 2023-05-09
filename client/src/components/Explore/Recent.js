import useFetcher from '@/hooks/useFetcher'
import React, { useEffect, useState } from 'react'
import Loader from '../common/Loader'
import ProductCard from '../Product/ProductCard'

const RecentList = () => {
  const fetcher = useFetcher()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoding] = useState(true)
  const [error, setError] = useState('')
  const fetchProducts = async () => {
    setIsLoding(true)
    try {
      const res = await fetcher(`/api/products`)
      setProducts(res.data)
    } catch (error) {
      console.log(error)
      setError(error?.message || 'Something went wrong! 😕')
    }
    setIsLoding(false)
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    products.length && (
      <div className="my-12 w-full">
        <h2 className="text-2xl font-semibold">Recent Listings:</h2>
        <p className="text-md">Check out our latest items for sale. Shop our newest listings.</p>
        <div className="my-6 flex w-full flex-wrap gap-4">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p>{error}</p>
          ) : (
            products
              .slice(0, 3)
              .map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      </div>
    )
  )
}

export default RecentList
