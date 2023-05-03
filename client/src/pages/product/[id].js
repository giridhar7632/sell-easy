import Image from 'next/image'
import { useState } from 'react'
import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
// import Loader from '@/components/common/Loader'
// import { useTransition, animated } from 'react-spring'
import { useWishlist } from '@/hooks/useWishlist'
import Link from 'next/link'
import { Heart, Message } from '@/components/icons'
import Button from '@/components/common/Button'
import SmallProfile from '@/components/Profile/SmallProfile'
import TruncatedSentence from '@/components/TruncatedSentence'
import getRandomColor from '@/utils/randomColor'
import UpdateProduct from '@/components/Product/UpdateProduct'
import DeleteProduct from '@/components/Product/DeleteProduct'

const Product = ({ product, error, message, type }) => {
  const [currentProduct, setCurrentProduct] = useState(product)
  const { addProductToWishlist, removeProductFromWishlist, isProductInWishlist } = useWishlist()
  const [wishlisted, setWishlisted] = useState(isProductInWishlist(product?._id))
  const hasMedia = product?.media?.length > 0
  const { isAuth, user } = useAuth()

  const handleWishlistClick = () => {
    setWishlisted((prev) => !prev)
    wishlisted
      ? removeProductFromWishlist(currentProduct._id)
      : addProductToWishlist(currentProduct._id)
  }

  // const { user, isAuth } = useAuth()
  console.log({ product })

  if (error || type === 'error')
    return (
      <Layout meta={{ name: 'Product' }}>
        <div className={'w-full text-center text-2xl font-bold text-gray-400'}>{message}</div>
      </Layout>
    )

  return (
    <Layout meta={{ name: product?.name || 'Product' }}>
      {product && (
        <div className={'flex flex-col'}>
          {user?._id === product?.seller?._id && (
            <div
              className={
                'my-2 flex flex-col items-center justify-between rounded-md border p-3 font-medium md:flex-row'
              }
            >
              These controls are only visible to you.
              <div className="mt-2 flex items-center gap-4 md:mt-0">
                <UpdateProduct
                  token={isAuth}
                  product={currentProduct}
                  setProduct={setCurrentProduct}
                />
                <DeleteProduct token={isAuth} productId={currentProduct?._id} />
              </div>
            </div>
          )}
          <div className="flex w-full flex-col justify-between lg:flex-row">
            <Link
              href={currentProduct.image}
              target={'_blank'}
              className={`relative bg-${getRandomColor()}-100 h-full w-full flex-shrink-0 overflow-hidden rounded-xl md:h-auto lg:w-3/4`}
            >
              <Image
                src={currentProduct.image}
                alt={currentProduct.name}
                fill
                className="rounded-xl object-contain object-center transition-all duration-500 ease-in-out group-hover:scale-110"
              />
            </Link>

            <div className="mt-6 flex w-full flex-col overflow-y-auto px-4 py-6 md:mt-0 lg:w-1/4">
              <h1 className="mb-2 text-3xl font-medium">{currentProduct.name}</h1>
              <p className="mb-4 text-xl font-semibold">₹ {currentProduct.price}</p>

              <div className="mb-6 flex flex-col">
                <h2 className="mb-2 text-xl font-semibold">Details</h2>
                <div className="flex flex-col">
                  <p className="mb-1 text-gray-600">
                    <span className={'w-20 font-medium'}>Condition:</span>{' '}
                    {currentProduct.condition}
                  </p>
                  <Link
                    className="mb-1 text-gray-600 hover:text-black"
                    href={`/category/${currentProduct.category._id}`}
                  >
                    <span className={'w-20 font-medium'}>Category: </span>
                    {currentProduct.category.name}
                  </Link>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <button
                  className={
                    'flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold leading-snug outline-0 ring-gray-100 transition duration-150 ease-in-out hover:ring focus:ring'
                  }
                  onClick={handleWishlistClick}
                >
                  <Heart
                    fill={wishlisted ? '#db2777' : 'none'}
                    className={wishlisted ? 'text-pink-600' : ''}
                    width={24}
                  />
                  {wishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                <Button onClick={() => console.log(currentProduct.name)}>
                  <Message width={24} /> Buy now
                </Button>
              </div>

              <div className="mb-6 flex flex-col">
                <h2 className="mb-2 text-xl font-semibold">Description</h2>
                <div className="text-sm text-gray-600">
                  <TruncatedSentence>{currentProduct.description}</TruncatedSentence>
                </div>
              </div>

              <div className="mb-6 flex flex-col">
                <h2 className="mb-2 text-xl font-semibold">Seller Information</h2>
                <SmallProfile {...currentProduct.seller} />
              </div>
            </div>
          </div>

          {hasMedia && (
            <>
              <h2 className={'mt-4 mb-2 text-2xl font-semibold'}>Media</h2>
              <div className={'flex flex-wrap justify-center overflow-hidden rounded-lg'}>
                {currentProduct.media.map((i, idx) => (
                  <Link
                    href={i}
                    target={'_blank'}
                    className="relative h-full w-full p-1 md:w-1/2 lg:w-1/2"
                    key={idx}
                  >
                    <Image
                      width={1280}
                      height={720}
                      className="aspect-video overflow-hidden rounded-lg"
                      src={i}
                      alt=""
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  )
}

export default Product

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:5000/api/products/${params.id}`)
  const data = await res.json()
  try {
    return {
      props: { product: data, message: data.message, type: data.type },
      revalidate: 60 * 60,
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        error: 'Something went wrong!',
      },
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:5000/api/products`)
  const data = await res.json()
  return {
    paths: data.data.map((item) => ({
      params: { id: item._id },
    })),
    fallback: true,
  }
}
