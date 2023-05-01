import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Close } from '../icons'

export default function Drawer({ title = '', description = '', children, open, toggle }) {
  return (
    <Transition appear={true} show={open} as={Fragment}>
      <Dialog unmount={false} onClose={toggle} className="fixed inset-0 z-30 overflow-y-auto">
        <div className="fixed right-0 flex h-screen w-full md:w-1/2 lg:w-[40%]">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div
              className={`right-0 z-50 flex w-full flex-col justify-between overflow-hidden rounded-l-xl bg-white p-6 text-left align-middle shadow-sm`}
            >
              <div>
                <Dialog.Title className="flex items-center justify-between text-gray-800">
                  <span className={'text-2xl font-bold'}>{title}</span>
                  <button
                    className={
                      'inline-flex items-center rounded-xl p-2 font-bold hover:ring hover:ring-gray-100'
                    }
                    onClick={toggle}
                  >
                    <Close width={24} />
                  </button>
                </Dialog.Title>

                {/* <Dialog.Description>{description}</Dialog.Description> */}
                {children}
              </div>
              {/* <div className="mt-10 self-center">
                
              </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
