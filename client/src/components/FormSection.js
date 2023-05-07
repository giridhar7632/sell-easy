import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { ChevronRight } from './icons'

export default function FormSection({ title, className, children, ...props }) {
  return (
    <Disclosure className={'mb-2'} as="div" {...props}>
      {({ open }) => (
        <>
          <Disclosure.Button
            as="div"
            className={clsx(
              'flex cursor-pointer items-center justify-between rounded-md border p-3 font-medium',
              !open && 'shadow-sm hover:shadow-md',
              className
            )}
          >
            {title}
            <ChevronRight
              width={24}
              height={24}
              className={clsx('text-teal-500', open && 'rotate-90 transform duration-100')}
            />
          </Disclosure.Button>
          <Disclosure.Panel as="div" className="rounded border-gray-400 p-3 shadow-sm">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
