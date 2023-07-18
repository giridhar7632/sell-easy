import { useCategory } from '@/hooks/useCategories'
import Link from 'next/link'
import React from 'react'

const CategoryList = () => {
  const { categories } = useCategory()
  return (
    <div className="my-12 w-full">
      <h2 className="text-2xl font-semibold">Category:</h2>
      <p className="text-md">
        Choose from a variety of categories. Find what you&apos;re looking for by category.
      </p>
      <div className="my-6 flex w-full flex-wrap gap-4">
        {categories.map((i) => (
          <Link
            key={i._id}
            href={`/category/${i._id}`}
            className={`border-1 mx-1 rounded-xl border-gray-200 bg-teal-100 py-2 px-4 font-semibold text-teal-500 hover:ring hover:ring-teal-200`}
          >
            {i.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
