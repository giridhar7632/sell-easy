import Image from 'next/image'
import { AddToCart, Heart } from '../icons'
import { IconButton } from '../common/Button'
import clsx from 'clsx'
import { useWishlist } from '@/hooks/useWishlist'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const { addProductToWishlist, removeProductFromWishlist, isProductInWishlist } = useWishlist()
  const [wishlisted, setWishlisted] = useState(isProductInWishlist(product._id))
  return (
    <div className="w-[100%] cursor-pointer overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm md:w-[48%] lg:w-[32%]">
      <div className="relative h-72 w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover object-center" />
        <button
          className={clsx(
            'z-11 absolute top-2 right-2 rounded-full border-0 bg-white p-2 shadow outline-0 hover:bg-gray-100',
            wishlisted && 'text-pink-600'
          )}
          onClick={() => {
            setWishlisted((prev) => !prev)
            wishlisted ? removeProductFromWishlist(product._id) : addProductToWishlist(product._id)
          }}
        >
          <Heart fill={wishlisted ? '#db2777' : 'none'} width={24} />
        </button>
      </div>
      <div className="px-4 py-2">
        <h2 className="my-2 truncate text-lg font-medium">{product.name}</h2>
        <p className="text-xs font-semibold text-gray-400">Price</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">₹ {product.price}</p>
          <IconButton onClick={() => console.log(product.name)}>
            <AddToCart width={24} height={24} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
