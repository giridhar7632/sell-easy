import React, { useEffect, useState } from 'react'
import SingleProduct from './SingleProduct'
import Loader from '../common/Loader'
import useFetcher from '@/hooks/useFetcher'

const ProductsList = ({ token, userId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const fetcher = useFetcher()
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const res = await fetcher(`/api/users/${userId}/products`, { token })
      setProducts(res)
    } catch (error) {
      console.log(error)
      setError(error?.message || 'Something went wrong! 😕')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isLoading ? (
    <Loader />
  ) : error ? (
    <div className={'w-full text-center text-2xl font-bold text-gray-400'}>{error}</div>
  ) : products.length <= 0 ? (
    <div className={'w-full text-center text-2xl font-bold text-gray-400'}>
      {'No products listed yet! 😐'}
    </div>
  ) : (
    <ul className="w-full">
      {products.map((product) => (
        <li key={product._id}>
          <SingleProduct {...product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductsList
