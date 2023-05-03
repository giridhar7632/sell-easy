import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import useFetcher from './useFetcher'
import useToast from './useToast'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [wishlist, setWishlist] = useState({ products: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState('')
  const { isAuth } = useAuth()
  const fetcher = useFetcher()
  const toast = useToast()

  const toggleWishlist = () => setWishlistOpen(!wishlistOpen)

  const getWishlist = async () => {
    try {
      const res = await fetcher(`/api/wishlist`, { method: 'GET', token: isAuth })
      if (res.length) {
        setWishlist(res[0])
      } else {
        const newList = await fetcher(`/api/wishlist`, {
          token: isAuth,
          body: { name: 'Main list', description: 'This is your default wishlist.' },
        })

        setWishlist(newList)
      }
    } catch (error) {
      console.log(error)
      error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuth) {
      getWishlist()
    }
    // getWishlist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, wishlistOpen])

  const addProductToWishlist = async (productId) => {
    try {
      const res = await fetcher(`/api/wishlist/${wishlist._id}/products`, {
        body: { productId },
        token: isAuth,
      })
      setWishlist(res)
    } catch (error) {
      error?.message
        ? toast.open({ message: error.message, type: 'error' })
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
  }

  const removeProductFromWishlist = async (productId) => {
    try {
      const res = await fetcher(`/api/wishlist/${wishlist._id}/products/${productId}`, {
        method: 'DELETE',
        token: isAuth,
      })
      setWishlist(res)
    } catch (error) {
      error?.message
        ? toast.open({ message: error.message, type: 'error' })
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
  }

  const isProductInWishlist = (productId) =>
    wishlist.products.some((product) => product._id === productId)

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        getWishlist,
        addProductToWishlist,
        removeProductFromWishlist,
        isProductInWishlist,
        isLoading,
        status,
        wishlistOpen,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
