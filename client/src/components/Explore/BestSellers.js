import React, { useEffect, useState } from 'react'
import SmallProfile from '../Profile/SmallProfile'
import Loader from '../common/Loader'
import useFetcher from '@/hooks/useFetcher'

const BestSellers = () => {
  const fetcher = useFetcher()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoding] = useState(true)
  const [error, setError] = useState('')
  const fetchUsers = async () => {
    setIsLoding(true)
    try {
      const res = await fetcher(`/api/users`)
      setUsers(res)
    } catch (error) {
      console.log(error)
      setError(error?.message || 'Something went wrong! 😕')
    }
    setIsLoding(false)
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="my-12 w-full">
      <h2 className="text-2xl font-semibold">Best Sellers:</h2>
      <p className="text-md">
        Find out who&apos;s selling the most popular items. Check out our top-rated sellers.
      </p>
      <div className="my-6 flex w-full flex-wrap gap-4">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          users.slice(0, 4).map((user) => <SmallProfile key={user._id} {...user} />)
        )}
      </div>
    </div>
  )
}

export default BestSellers
