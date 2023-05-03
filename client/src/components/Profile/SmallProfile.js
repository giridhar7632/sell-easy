import Image from 'next/image'
import React from 'react'
import Link from '../common/Link'
import clsx from 'clsx'

const SmallProfile = ({ _id, name, profileImage, small }) => {
  return (
    <div className={'flex items-center gap-4'}>
      <Image
        width={small ? 30 : 48}
        height={small ? 30 : 48}
        className="h-10 w-10 rounded-full"
        src={profileImage || 'https://api.multiavatar.com/v.png'}
        alt={name}
        placeholder={'blur'}
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      <div className="flex flex-1 flex-col">
        <p className={clsx('font-medium', small ? 'text-sm' : 'text-lg')}>{name}</p>
        <Link className={clsx(small ? 'text-xs' : 'text-sm')} href={`/user/${_id}`}>
          View details
        </Link>
      </div>
    </div>
  )
}

export default SmallProfile
