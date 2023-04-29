import clsx from 'clsx'
import React from 'react'

export default function Button({
  variant = 'primary',
  loading = false,
  loadingText = 'loading...',
  className,
  children,
  ...attributes
}) {
  const variantClassname = clsx({
    ['bg-teal-500 hover:bg-teal-600 text-white disabled:bg-teal-500 disabled:ring-0']:
      variant === 'primary',
    ['bg-teal-100 ring-teal-50 text-teal-500 hover:text-teal-600 disabled:bg-teal-100 disabled:ring-0']:
      variant === 'secondary',
    ['text-teal-500 disabled:text-teal-300 bg-white bg-opacity-10 backdrop-blur-sm']:
      variant === 'text',
  })

  return (
    <button
      {...attributes}
      className={clsx(
        'inline-block cursor-pointer rounded-md px-6 py-2 text-sm font-semibold leading-snug ring-teal-200 transition duration-150 ease-in-out hover:ring focus:ring',
        variantClassname,
        className
      )}
      disabled={attributes.disabled || loading}
      onClick={attributes.onClick}
    >
      <span className="mr-xsmall last:mr-0">{loading ? loadingText : children}</span>
    </button>
  )
}
