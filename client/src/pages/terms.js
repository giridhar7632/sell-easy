import Layout from '@/components/layout'

const terms = () => {
  return (
    <Layout meta={{ name: 'Terms' }}>
      <div id={'terms'} className="prose my-10 mx-auto xl:prose-lg">
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to our online marketplace where students can sell products within our campus
          community. By using our platform, you agree to comply with the following terms and
          conditions:
        </p>

        <h3>Seller and Buyer Obligations</h3>
        <ul>
          <li>Sellers must be current students of our campus community.</li>
          <li>All products sold must be legal and comply with our community standards.</li>
          <li>Sellers must provide accurate descriptions and images of their products.</li>
          <li>Buyers must be current students of our campus community.</li>
          <li>
            Buyers are responsible for contacting sellers and negotiating price and place of
            exchange.
          </li>
          <li>
            Any issues or disputes between buyers and sellers should be resolved between themselves.
          </li>
        </ul>

        <h3>Intellectual Property</h3>
        <ul>
          <li>
            Sellers must own the intellectual property rights to their products or have obtained
            permission to sell them.
          </li>
          <li>Buyers must respect the intellectual property rights of the sellers.</li>
        </ul>

        <h3>Disclaimer</h3>
        <p>
          Our platform is provided <strong>{'"as is"'}</strong> without any representations or
          warranties, express or implied. We do not guarantee the accuracy, completeness,
          reliability, suitability or availability of the platform or the information, products,
          services, or related graphics contained on the platform for any purpose. Any reliance you
          place on such information is therefore strictly at your own risk.
        </p>

        <h3>Changes to the Terms and Conditions</h3>
        <p>
          We reserve the right to modify these terms and conditions at any time without prior
          notice. By continuing to use our platform, you agree to be bound by the updated terms and
          conditions.
        </p>
      </div>
    </Layout>
  )
}

export default terms
