import Image from 'next/image'
import React from 'react'

const SingleProduct = ({ image, name, price, _id, createdAt, category }) => {
  return (
    <div className="group mb-2 flex h-48 items-center gap-2 rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
      <div className={'relative h-48 w-48 overflow-hidden rounded-l-lg'}>
        <Image
          fill
          className="h-full object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-110"
          src={image}
          alt={name}
          placeholder={'blur'}
          blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      <a className={'p-4'} href={`/product/${_id}`}>
        <div className={'ml-3 flex flex-col gap-1'}>
          <p className="my-2 text-xl font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-400">
            Price: <span className="text-lg font-bold text-gray-900">₹ {price}</span>{' '}
          </p>
          {category && (
            <p className="text-sm text-gray-600">
              Category: <span>{category?.name}</span>{' '}
            </p>
          )}
          <p className="text-sm text-gray-600">
            Posted: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </a>
    </div>
  )
}

export default SingleProduct
