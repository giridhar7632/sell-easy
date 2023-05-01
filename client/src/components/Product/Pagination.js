import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handlePrevPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1)
    }
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center">
        <button
          className={`rounded-l-xl bg-gray-200 py-2 px-4 hover:bg-gray-300 ${
            isFirstPage ? 'cursor-default hover:bg-gray-200' : 'cursor-pointer'
          }`}
          disabled={isFirstPage}
          onClick={handlePrevPage}
        >
          Previous
        </button>
        <ul className="flex list-none flex-wrap rounded pl-0">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                className={`${
                  currentPage === number
                    ? 'border-0 bg-teal-100 text-teal-500'
                    : 'bg-white text-gray-700 hover:ring hover:ring-teal-100'
                } border-1 mx-1 rounded-xl border-gray-200 py-2 px-4 font-semibold`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`rounded-r-xl bg-gray-200 py-2 px-4 hover:bg-gray-300 ${
            isLastPage ? 'cursor-default hover:bg-gray-200' : 'cursor-pointer'
          }`}
          disabled={isLastPage}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
