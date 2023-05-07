import React from 'react'
import SmallProfile from '../Profile/SmallProfile'
import TruncatedSentence from '../TruncatedSentence'

const SingleReview = ({ comment, reviewer, createdAt }) => {
  return (
    <div class="mb-2 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
      <div class="flex flex-col rounded-lg border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <blockquote class="mx-auto mb-2 w-full dark:text-gray-300">
          {/* <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3> */}
          <TruncatedSentence className="my-3 text-lg">{comment}</TruncatedSentence>
        </blockquote>
        <div className={'flex items-end justify-between'}>
          <SmallProfile small {...reviewer} />
          <div className="text-xs text-gray-300">
            posted: {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleReview
