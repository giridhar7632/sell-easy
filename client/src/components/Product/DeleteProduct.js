import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Button from '../common/Button'
import useFetcher from '@/hooks/useFetcher'
import { useRouter } from 'next/router'
import useToast from '@/hooks/useToast'

const DeleteProduct = ({ productId, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)
  const fetcher = useFetcher()
  const router = useRouter()
  const toast = useToast()

  const handleDelete = async () => {
    try {
      await fetcher(`/api/products/${productId}`, {
        method: 'DELETE',
        token: props.token,
      })
      router.push('/sell')
    } catch (error) {
      console.log(error)
      error?.message
        ? toast.open({ message: error.message, type: 'error' })
        : toast.open({ message: 'Something went wrong! 😕', type: 'error' })
    }
  }

  return (
    <>
      <Button variant={'danger'} onClick={handleOpen} type="button" {...props}>
        Delete
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-5 text-lg font-semibold leading-6 text-gray-800"
                  >
                    Delete Product
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you really want to unlist this product?
                    </p>
                  </div>

                  <div className="mt-4 flex w-full items-center space-x-4">
                    <Button className="flex-1" variant="text" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DeleteProduct
