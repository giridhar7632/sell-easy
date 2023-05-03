import React from 'react'
import SingleReview from './SingleReview'

const ReviewList = ({ reviews }) => {
  return reviews.length <= 0 ? (
    <div className={'w-full text-center text-2xl font-bold text-gray-400'}>
      {'No reviews yet! 😐'}
    </div>
  ) : (
    <ul className="w-full">
      {reviews.map((review) => (
        <li key={review._id}>
          <SingleReview {...review} />
        </li>
      ))}
    </ul>
  )
}

export default ReviewList
