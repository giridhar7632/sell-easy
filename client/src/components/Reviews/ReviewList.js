import React, { useState } from 'react'
import SingleReview from './SingleReview'
import AddReview from './AddReview'

const ReviewList = ({ reviews, userId }) => {
  const [currReviews, setCurrReviews] = useState(reviews)
  return currReviews.length <= 0 ? (
    <div className={'w-full text-center text-2xl font-bold text-gray-400'}>
      <AddReview userId={userId} setReviews={setCurrReviews} />
      {'No reviews yet! 😐'}
    </div>
  ) : (
    <ul className="w-full">
      <AddReview userId={userId} setReviews={setCurrReviews} />
      {currReviews.map((review) => (
        <li key={review._id}>
          <SingleReview {...review} />
        </li>
      ))}
    </ul>
  )
}

export default ReviewList
