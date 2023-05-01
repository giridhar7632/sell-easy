import Image from 'next/image'
import React, { useState } from 'react'
import { Logout } from '../icons'
import clsx from 'clsx'

const Avatar = ({ logout, name, email, profileImage = 'https://api.multiavatar.com/v.png' }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="relative">
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
        type="button"
        onClick={() => setIsActive((prev) => !prev)}
      >
        <Image
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
          src={profileImage}
          alt={name}
        />
      </button>

      <div
        // style={showDropDown}
        id="dropdownAvatar"
        className={clsx(
          isActive ? 'translate-y-1 transform' : 'hidden',
          'absolute right-0 top-full z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700'
        )}
      >
        <div className="px-4 py-2 text-sm text-gray-900 dark:text-white">
          <div className="font-semibold">{name}</div>
          <div className="truncate text-teal-500 dark:text-teal-300">{email}</div>
        </div>
        <a
          href={'/user/me'}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Dashboard
        </a>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <Logout width={18} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )
}

export default Avatar
