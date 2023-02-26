import Link from '../common/Link'

const Footer = () => (
  <footer className="relative my-2 mx-4 flex flex-wrap items-center justify-between rounded-lg bg-white bg-opacity-10 py-4 shadow-sm backdrop-blur-sm">
    <p>
      &copy; {new Date().getFullYear()}
      <Link href={'https://github.com/giridhar7632/sell-easy'} target={'_blank'}>
        Sell Easy.
      </Link>
      All Rights Reserved
    </p>
    <ul className="flex items-center gap-1">
      <Link href={'/about'}>About</Link>
      <Link href={'/policy'}>Privacy Policy</Link>
      <Link href={'/terms'}>Terms & Conditions</Link>
    </ul>
  </footer>
)

export default Footer
