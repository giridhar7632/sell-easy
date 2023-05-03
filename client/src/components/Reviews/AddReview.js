import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import useToast from '@/hooks/useToast'
import useFetcher from '@/hooks/useFetcher'
import { useAuth } from '@/hooks/useAuth'
import FormSection from '../FormSection'

const AddReview = ({ userId, setReviews }) => {
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fetcher = useFetcher()
  const toast = useToast()
  const { isAuth } = useAuth()
  const onFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetcher(`/api/review`, {
        token: isAuth,
        target: { type: 'Seller', id: userId },
        comment: review,
        rating: 0,
      })
      setReviews((prev) => [...prev, res.review])
      toast.open(res)
    } catch (error) {
      console.log(error)
      error?.message
        ? toast.open(error)
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
    setIsLoading(false)
  }
  // return (
  //   <div className="mb-2 rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-700">

  //   </div>
  // )
  return (
    <FormSection title={'Add review'}>
      <Input
        type={'text'}
        label={'Review'}
        placeholder={'Type your thoughts about this user...'}
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <Button loading={isLoading} loadingText={'Adding review...'} onClick={onFormSubmit}>
        Add Review
      </Button>
    </FormSection>
  )
}

export default AddReview
