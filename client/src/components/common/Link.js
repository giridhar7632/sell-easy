import clsx from 'clsx'
import NextLink from 'next/link'
import { useState } from 'react'
import { useSpring, animated } from 'react-spring'

const Link = ({ children, ...props }) => {
  return (
    <NextLink
      {...props}
      className={clsx(
        'relative inline-block text-teal-500 decoration-wavy decoration-1 underline-offset-4 hover:underline',
        props.className
      )}
    >
      <p>{children}</p>
    </NextLink>
  )
}

export const AnimatedNavLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const underlineAnimation = useSpring({
    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
    backgroundColor: '#000',
    height: '2px',
    borderRadius: '2px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    width: '100%',
    config: { tension: 500, friction: 50 },
  })

  return (
    <a
      href={href}
      className="relative mr-6 font-semibold text-gray-800 transition duration-150"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <animated.div style={underlineAnimation} />
    </a>
  )
}

export default Link
