import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetcher from './useFetcher'
import { useAuth } from './useAuth'

export const CategoryContext = createContext()
export const useCategory = () => useContext(CategoryContext)

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetcher = useFetcher()
  const { isAuth } = useAuth()

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Function to fetch categories from the server
  const fetchCategories = async () => {
    setLoading(true)
    try {
      const response = await fetcher('/api/categories')
      setCategories(response)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  // Function to add a new category
  const addCategory = async (name) => {
    setLoading(true)
    try {
      const response = await fetcher('/api/categories', {
        body: { name, description, image },
        token: isAuth,
      })
      setCategories([...categories, response])
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  return (
    <CategoryContext.Provider value={{ categories, loading, error, fetchCategories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}
