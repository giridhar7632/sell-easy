import Image from 'next/image'

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-lg border border-gray-200 w-40 h-56 bg-white p-4 shadow-sm">
      <div className="relative h-40 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain object-center"
        />
      </div>
      <h2 className="mt-2 text-lg font-medium">{product.name}</h2>
      {/* <p className="text-sm text-gray-500 mt-1">{product.description}</p> */}
      <p className="mt-1 text-lg font-medium">${product.price}</p>
      <button className="mt-2 rounded-md bg-teal-100 px-4 py-2 text-teal-500">Add to Cart</button>
    </div>
  )
}

export default ProductCard
