import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from './icons'

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const goToPreviousImage = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1)
  }

  const goToNextImage = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1)
  }

  return (
    <div className="relative h-full w-full flex-shrink-0 overflow-hidden rounded-xl md:h-auto lg:w-3/4">
      <div className="absolute inset-0">
        <Image
          src={images[currentImage]}
          alt="Product Image"
          fill
          quality={100}
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 text-gray-900 shadow-lg transition-all duration-500 ease-in-out hover:scale-110 focus:outline-none"
          onClick={goToPreviousImage}
        >
          <ChevronLeft height={24} width={24} />
        </button>
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 text-gray-900 shadow-lg transition-all duration-500 ease-in-out hover:scale-110 focus:outline-none"
          onClick={goToNextImage}
        >
          <ChevronRight height={24} width={24} />
        </button>
        <Image
          src={images[currentImage]}
          alt="Product Image"
          width={500}
          height={500}
          quality={100}
          className="object-contain object-center transition-all duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
    </div>
  )
}

export default Carousel
