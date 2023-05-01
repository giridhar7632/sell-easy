import ProductsList from '@/components/Product/ProductList'
import { Search } from '@/components/icons'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { products } from 'data'

const Buy = ({ currentPage, next, previous, error, totalPages, data }) => {
  const router = useRouter()
  const [page, setPage] = useState(router.query.page || 1)
  const [search, setSearch] = useState(router.query.search || '')
  const [sort, setSort] = useState(router.query.sort || '')

  const [filteredProducts, setFilteredProducts] = useState(data)

  useEffect(() => {
    const queryPage = Number(router.query.page)
    if (queryPage && queryPage !== page) {
      setPage(queryPage)
    }
  }, [router.query.page, page])

  // useEffect(() => {
  //   const startIndex = (page - 1) * 12
  //   const endIndex = startIndex + 12
  //   setFilteredProducts(products.slice(startIndex, endIndex))
  //   router.push(`/?page=${page}`)
  // }, [page, router])

  const handlePrevPage = () => {
    setPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    setPage((prev) => prev + 1)
  }

  console.log({ currentPage, next, previous, totalPages, data })

  return (
    <Layout meta={{ name: 'Buy' }}>
      {error ? (
        <div className={'w-full text-center text-2xl font-bold text-gray-300'}>{error}</div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="my-4 text-clip text-lg font-bold md:text-3xl">
              Discover the products you want to buy!
            </h1>
            <div className="flex w-full items-center gap-2 rounded-full border border-gray-200 px-4 py-2 shadow-sm md:max-w-[90%] lg:max-w-[50%]">
              <Search className={'text-gray-300'} width={24} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type={'text'}
                className="flex-1 border-none outline-none"
                placeholder="Search among wide range of products"
              ></input>
            </div>
          </div>
          <div className="container my-4 flex w-full md:my-8">
            <div className="w-[25%] hidden md:block">
              <h2 className="text-lg font-semibold">Sort by:</h2>
              <input type="radio" />
              Popularity
              <input type="radio" />
              Price
              <input type="radio" />
              Rating
            </div>
            <div className="flex flex-1 flex-wrap">
              {filteredProducts?.length ? (
                <ProductsList products={filteredProducts} />
              ) : (
                <div className={'w-full text-center text-xl font-bold text-gray-300'}>
                  No products to display!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Buy

export async function getStaticProps() {
  try {
    // const res = await fetch('http://localhost:5000/api/products')
    // const data = await res.json()

    return {
      props: {
        data: products,
      },
      revalidate: 60 * 60, // revalidate every hour
    }
  } catch (error) {
    return {
      props: {
        error: 'Error fetching data! 😕',
      },
    }
  }
}
