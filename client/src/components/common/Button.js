import clsx from 'clsx'
import React from 'react'

export default function Button({
  variant = 'primary',
  loading = false,
  loadingText = 'Loading...',
  className,
  children,
  ...attributes
}) {
  const variantClassname = clsx({
    ['bg-teal-500 hover:bg-teal-600 text-white disabled:bg-teal-500 disabled:ring-0']:
      variant === 'primary',
    ['bg-teal-100 ring-0 text-teal-500 hover:text-teal-600 disabled:bg-teal-100 disabled:ring-0']:
      variant === 'secondary',
    ['text-teal-500 hover:text-teal-600 hover:ring-0 disabled:text-teal-300 bg-white bg-opacity-10 backdrop-blur-sm']:
      variant === 'text',
    ['bg-red-500 hover:ring-red-200 hover:bg-red-600 text-white disabled:bg-red-300 disabled:ring-0']:
      variant === 'danger',
  })

  return (
    <button
      {...attributes}
      className={clsx(
        variantClassname,
        'flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold leading-snug ring-teal-200 transition duration-150 ease-in-out hover:ring focus:ring',
        className
      )}
      disabled={attributes.disabled || loading}
      onClick={attributes.onClick}
    >
      {loading ? loadingText : children}
    </button>
  )
}

export function IconButton({ children, ...props }) {
  return (
    <button
      className="flex items-center justify-center rounded-full bg-teal-100 p-2 text-teal-500 ring-0 hover:text-teal-600 hover:ring hover:ring-teal-200 disabled:bg-teal-100 disabled:ring-0"
      {...props}
    >
      {children}
    </button>
  )
}
