import Image from 'next/image'
import { AddToCart } from '../icons'
import { IconButton } from '../common/Button'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-whiten lg:w[33%] w-[100%] cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow-sm md:w-[48%] lg:w-[250px]">
      <div className="relative h-72 w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover object-center" />
      </div>
      <div className="px-4 py-2">
        <h2 className="my-2 text-lg font-medium">{product.name}</h2>
        <p className="text-xs font-semibold text-gray-400">Price</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">₹ {product.price}</p>
          <IconButton onClick={() => console.log(product.name)}>
            <AddToCart width={24} height={24} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
