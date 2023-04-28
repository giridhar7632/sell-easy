import Head from 'next/head'

const Meta = ({
  title = 'Sell Easy',
  name = 'A place to easily sell or buy used goods',
  description = 'A place to easily sell your used goods within the NIT campus.',
  url = 'https://sell-easy.vercel.app',
  image = '/og.png',
  children,
}) => (
  <Head>
    <title>{title === name || !name ? title : `${title} | ${name}`}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={url + image} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={name} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={url + image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="theme-color" content="#f1f5f8" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#172126" media="(prefers-color-scheme: light)" />

    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#ffc40d" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    {children}
  </Head>
)

export default Meta
