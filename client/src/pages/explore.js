import BestSellers from '@/components/Explore/BestSellers'
import CategoryList from '@/components/Explore/CategoryList'
import RecentList from '@/components/Explore/Recent'
import Layout from '@/components/layout'

const explore = () => {
  return (
    <Layout meta={{ name: 'Explore' }}>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="my-4 text-clip text-3xl font-bold md:text-5xl">Explore</h1>
        <p className="text-md">Explore the available products all around the campus!</p>
      </div>
      <div className="mx-auto max-w-screen-xl px-12">
        <CategoryList />
        <BestSellers />
        <RecentList />
      </div>
    </Layout>
  )
}

export default explore
