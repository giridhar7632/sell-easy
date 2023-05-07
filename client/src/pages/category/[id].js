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

const Buy = () => {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currPage, setCurrPage] = useState(router.query.page || 1)
  const [pages, setPages] = useState(1)
  const [error, setError] = useState('')
  const fetcher = useFetcher()
  const { categories, loading } = useCategory()
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    router.push({
      pathname: router.pathname,
      query: {
        category,
        page: currPage,
      },
    })
    fetchProducts(1, category)
  }

  const fetchProducts = async (page = 1, category = '') => {
    try {
      const query = searchTerm ? `search=${searchTerm}&` : category ? `categoryId=${category}&` : ''
      const res = await fetcher(`/api/products?${query}page=${page}&limit=${PAGE_SIZE}`)
      setProducts(res.data)
      setPages(res.totalPages)
    } catch (error) {
      console.log(error)
      setError(error?.message || 'Something went wrong! 😕')
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     const query = searchTerm ? `?search=${searchTerm}&page=${currPage}` : ''
  //     router.push(`${url.split('?')[0]}${query}`)
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router, searchTerm, currPage])

  const handleSearch = throttle((value) => {
    setSearchTerm(value)
    setCurrPage(1)
    fetchProducts(1)
    router.push({
      pathname: router.pathname,
      query: {
        search: value,
        page: currPage,
      },
    })
  }, 500)

  const handlePageChange = (page) => {
    setCurrPage(page)
    router.push({
      pathname: router.pathname,
      query: {
        category: selectedCategory,
        page,
      },
    })
    fetchProducts(page, selectedCategory)
  }

  // useEffect(() => {
  //   const queryPage = Number(router.query.page)
  //   if (queryPage && queryPage !== currPage) {
  //     setCurrPage(queryPage)
  //   }
  // }, [router.query.page, currPage])

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
                className="flex-1 border-none outline-none"
                placeholder="Search among wide range of products"
              ></input>
            </div>
          </div>
          <div className="container my-4 flex w-full md:my-8">
            <div className="hidden w-[25%] md:block">
              <h2 className="text-lg font-semibold">Category:</h2>
              {loading ? (
                <Loader size={24} />
              ) : (
                <ul>
                  <li key="all">
                    <button
                      onClick={() => handleCategoryChange('')}
                      className={`font-medium text-gray-600 ${
                        selectedCategory === '' ? 'underline' : ''
                      }`}
                    >
                      All
                    </button>
                  </li>
                  {categories.length &&
                    categories.map((category) => (
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
                    ))}
                </ul>
              )}
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
