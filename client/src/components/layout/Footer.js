import Link from '../common/Link'

const Footer = () => (
  <footer className="relative my-2 mx-4 flex flex-wrap items-center justify-between rounded-lg bg-white bg-opacity-10 p-4 shadow-sm backdrop-blur-sm">
    <div>
      &copy; 2023
      <Link
        className={'mx-2 text-black'}
        href={'https://github.com/giridhar7632/sell-easy'}
        target={'_blank'}
      >
        Sell Easy.
      </Link>
      All Rights Reserved
    </div>
    <ul className="flex items-center gap-4">
      <Link href={'/about'}>About</Link>
      <Link href={'/policy'} rel={'noreferrer noopener'} target={'_blank'}>
        Privacy Policy
      </Link>
      <Link href={'/terms'} rel={'noreferrer noopener'} target={'_blank'}>
        Terms & Conditions
      </Link>
    </ul>
  </footer>
)

export default Footer
