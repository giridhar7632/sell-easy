import React from 'react'
import { useWishlist } from '@/hooks/useWishlist'
import Loader from './common/Loader'
import Drawer from './common/Drawer'
import Image from 'next/image'
import { Trash } from './icons'

const WishlistSidebar = ({ open, toggle }) => {
  const { wishlist, removeProductFromWishlist, isLoading, status } = useWishlist()
  console.log({ wishlist, isLoading, status })

  return (
    <Drawer open={open} title={'Wishlist'} toggle={toggle}>
      {isLoading ? (
        <Loader />
      ) : status ? (
        <div className={'mt-10 w-full text-center text-2xl font-bold text-gray-400'}>{status}</div>
      ) : (
        <div className="mt-6">
          {!wishlist.products.length ? (
            <div className={'mt-10 w-full text-center text-xl font-bold text-gray-300'}>
              {'No products added! 😕'}
            </div>
          ) : (
            wishlist.products.map((product) => (
              <div
                key={product._id}
                className="my-2 flex items-center rounded-lg border border-gray-200 py-2 px-3 shadow-sm"
              >
                <Image
                  height={50}
                  width={30}
                  className="h-16 w-10 rounded-md object-cover"
                  src={product.image}
                  alt={product.name}
                  placeholder={'blur'}
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <a href={`/product/${product._id}`}>
                  <div className={'ml-3 flex flex-col'}>
                    <p className="text-md my-2 font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-300">
                      Price:{' '}
                      <span className="text-lg font-bold text-gray-900">₹ {product.price}</span>{' '}
                    </p>
                  </div>
                </a>
                <button
                  className="ml-auto rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-500 transition-colors duration-150 hover:text-red-600"
                  onClick={() => removeProductFromWishlist(product._id)}
                >
                  <Trash width={24} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </Drawer>
  )
}

export default WishlistSidebar
