import Layout from '@/components/layout'

const explore = () => {
  return (
    <Layout meta={{ name: 'Explore' }}>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="my-4 text-clip text-3xl font-bold md:text-5xl">Explore</h1>
        <p className="text-md">Explore the available products all around the campus!</p>
      </div>
    </Layout>
  )
}

export default explore
