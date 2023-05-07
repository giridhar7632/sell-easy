import React, { useEffect, useState } from 'react'
import Loader from '../common/Loader'
import useFetcher from '@/hooks/useFetcher'
import SingleReview from '../Reviews/SingleReview'

const CommentsList = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState('')
  const fetcher = useFetcher()
  const fetchReviews = async () => {
    setIsLoading(true)
    try {
      const res = await fetcher(`/api/reviews/written`, { token })
      console.log(res)
      setReviews(res)
    } catch (error) {
      console.log(error)
      setError(error?.message || 'Something went wrong! 😕')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isLoading ? (
    <Loader />
  ) : error ? (
    <div className={'w-full py-4 text-center text-xl font-bold text-gray-300'}>{error}</div>
  ) : reviews.length <= 0 ? (
    <div className={'w-full py-4 text-center text-xl font-bold text-gray-300'}>
      {'No comments added yet! 😐'}
    </div>
  ) : (
    <ul className="w-full">
      {reviews.map((review) => (
        <li key={review._id}>
          <SingleReview {...review} reviewer={review.target} />
        </li>
      ))}
    </ul>
  )
}

export default CommentsList
