import Image from 'next/image'

const Sidebar = () => {
  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-shrink-0 items-center">
            <Image
              height={32}
              width={82}
              loading={'lazy'}
              className="h-8 w-auto"
              src="/logo.png"
              alt="Sell easy"
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">Sell Easy</span>
          </div>
          <div className="mt-6 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 bg-white px-2">
              <a
                href="#"
                className="group flex items-center rounded-md bg-gray-100 px-2 py-2 text-sm font-medium text-gray-900"
              >
                New In
              </a>
              <a
                href="#"
                className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Categories
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
