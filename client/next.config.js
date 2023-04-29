/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'api.multiavatar.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
