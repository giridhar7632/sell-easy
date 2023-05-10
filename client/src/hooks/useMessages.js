import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import useFetcher from './useFetcher'
import useToast from './useToast'

const MessageContext = createContext()

export const useMessage = () => {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return context
}

export const MessageProvider = ({ children }) => {
  const [wishlistOpen, setMessageOpen] = useState(false)
  const [wishlist, setMessage] = useState({ products: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState('')
  const { isAuth } = useAuth()
  const fetcher = useFetcher()
  const toast = useToast()

  const toggleMessage = () => setMessageOpen(!wishlistOpen)

  const getMessage = async () => {
    try {
      const res = await fetcher(`/api/wishlist`, { method: 'GET', token: isAuth })
      if (res.length) {
        setMessage(res[0])
      } else {
        const newList = await fetcher(`/api/wishlist`, {
          token: isAuth,
          body: { name: 'Main list', description: 'This is your default wishlist.' },
        })

        setMessage(newList)
      }
    } catch (error) {
      console.log(error)
      error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuth) {
      getMessage()
    }
    // getMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, wishlistOpen])

  const addProductToMessage = async (productId) => {
    try {
      const res = await fetcher(`/api/wishlist/${wishlist._id}/products`, {
        body: { productId },
        token: isAuth,
      })
      setMessage(res)
    } catch (error) {
      error?.message
        ? toast.open({ message: error.message, type: 'error' })
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
  }

  const removeProductFromMessage = async (productId) => {
    try {
      const res = await fetcher(`/api/wishlist/${wishlist._id}/products/${productId}`, {
        method: 'DELETE',
        token: isAuth,
      })
      setMessage(res)
    } catch (error) {
      error?.message
        ? toast.open({ message: error.message, type: 'error' })
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
  }

  const isProductInMessage = (productId) =>
    wishlist.products.some((product) => product._id === productId)

  return (
    <MessageContext.Provider
      value={{
        wishlist,
        getMessage,
        addProductToMessage,
        removeProductFromMessage,
        isProductInMessage,
        isLoading,
        status,
        wishlistOpen,
        toggleMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
