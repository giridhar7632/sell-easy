import ProductsList from '@/components/Product/ProductList'
import { Search } from '@/components/icons'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import { products } from 'data'
import Pagination from '@/components/Product/Pagination'
import { throttle } from 'lodash'
import useFetcher from '@/hooks/useFetcher'
import { useCategory } from '@/hooks/useCategories'
import Loader from '@/components/common/Loader'

const PAGE_SIZE = 9

const Buy = ({ data, totalPages, category, servererror }) => {
  const { query, push } = useRouter()
  const [products, setProducts] = useState(data)
  const [pages, setPages] = useState(totalPages)
  const [searchTerm, setSearchTerm] = useState(query.search || '')
  const [currPage, setCurrPage] = useState(parseInt(query.page, 10) || 1)
  const [isLoading, setIsLoding] = useState(false)
  const [error, setError] = useState(servererror || '')
  const { categories, loading } = useCategory()
  const [selectedCategory, setSelectedCategory] = useState('')
  const fetcher = useFetcher()

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrPage(1)
    push({
      pathname: '/buy',
      query: {
        category,
        page: 1,
      },
    })
  }

  const handleSearch = throttle((value) => {
    setSearchTerm(value)
    setCurrPage(1)
    push({
      pathname: '/buy',
      query: {
        search: value,
        page: 1,
        category: selectedCategory,
      },
    })
  }, 500)

  const handlePageChange = (page) => {
    setCurrPage(page)
    push({
      pathname: '/buy',
      query: {
        page,
        category: selectedCategory,
        search: searchTerm,
      },
    })
  }

  useEffect(() => {
    fetchProducts(currPage, searchTerm, selectedCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, searchTerm, selectedCategory])

  const fetchProducts = async (page = 1, searchTerm = '', selectedCategory = '') => {
    setIsLoding(true)
    try {
      const query = searchTerm
        ? `search=${searchTerm}&`
        : selectedCategory
        ? `categoryId=${selectedCategory}&`
        : ''
      const res = await fetcher(`/api/products?${query}page=${page}&limit=${PAGE_SIZE}`)
      setProducts(res.data)
      setPages(res.totalPages)
    } catch (error) {
      console.log(error)
      setError(error?.message || 'Something went wrong! 😕')
    }
    setIsLoding(false)
  }

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
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                type={'text'}
                className="flex-1 border-none bg-transparent outline-none"
                placeholder="Search among wide range of products"
              ></input>
            </div>
          </div>
          <div className="container my-4 flex w-full md:my-8">
            <div className="hidden w-[25%] md:block">
              <h2 className="text-lg font-semibold">Category:</h2>
              {
                <ul>
                  <li key="all">
                    <button
                      onClick={() => handleCategoryChange('')}
                      className={`font-medium text-gray-600 ${
                        selectedCategory === category._id ? 'text-teal-500' : ''
                      }`}
                    >
                      All
                    </button>
                  </li>
                  {categories.length
                    ? categories.map((category) => (
                        <li key={category._id}>
                          <button
                            onClick={() => handleCategoryChange(category._id)}
                            className={`font-medium text-gray-600 ${
                              selectedCategory === category._id ? 'text-teal-500' : ''
                            }`}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))
                    : 'Loading...'}
                </ul>
              }
            </div>
            <div className="flex flex-1 flex-wrap">
              {products?.length ? (
                <ProductsList products={products} />
              ) : (
                <div className={'w-full text-center text-xl font-bold text-gray-300'}>
                  No products to display!
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination currentPage={currPage} totalPages={pages} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Buy

// This gets called on every request
export async function getServerSideProps(context) {
  try {
    const id = context.query?.id ? context.query.id : ''
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=9${id ? `&category=${id}` : ''}`
    )
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data: data.data, totalPages: data.totalPages, category: id } }
  } catch (error) {
    return {
      props: { data: [], totalPages: 1, category: '', error: 'Something went wrong! 😕' },
    }
  }
}
