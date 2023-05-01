import ProductCard from './ProductCard'

const ProductsList = ({ products }) => {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductsList
