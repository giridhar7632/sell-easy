import React, { useState } from 'react'
import SingleReview from './SingleReview'
import AddReview from './AddReview'

const ReviewList = ({ reviews, userId }) => {
  const [currReviews, setCurrReviews] = useState(reviews)
  return currReviews.length <= 0 ? (
    <>
      <AddReview userId={userId} setReviews={setCurrReviews} />
      <div className={'w-full py-4 text-center text-xl font-bold text-gray-300'}>
        {'No reviews yet! 😐'}
      </div>
    </>
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
