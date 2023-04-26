import NextLink from 'next/link'

const Link = ({ children, ...props }) => {
  return (
    <NextLink {...props} className="px-2 text-primary hover:underline">
      {children}
    </NextLink>
  )
}

export default Link
