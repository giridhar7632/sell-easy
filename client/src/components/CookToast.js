import React from 'react'
import Button from './common/Button'
import useToast from '@/hooks/useToast'

const CookToast = () => {
  const toast = useToast()
  return <Button onClick={() => toast.open({ message: 'test', type: 'success' })}>CookToast</Button>
}

export default CookToast
