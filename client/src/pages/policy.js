import Layout from '@/components/layout'

const privacyPolicy = () => {
  return (
    <Layout meta={{ name: 'Policy' }}>
      <section id="policy" className="prose my-10 mx-auto xl:prose-lg">
        <h1>Our Policy</h1>
        <p>
          Welcome to our online marketplace for our campus community! Here at [Your Web Application
          Name], we want to make sure that our users have a safe and positive experience while
          buying and selling products. Below are our policies and guidelines that we expect our
          users to follow:
        </p>
        <ul>
          <li>
            <strong>Communication:</strong> Buyers and sellers are expected to communicate through
            our platform for negotiations and exchange arrangements. Do not share personal contact
            information until an agreement has been made through the platform.
          </li>
          <li>
            <strong>Item descriptions:</strong> Sellers should provide accurate and detailed
            descriptions of their products, including any defects or damages.
          </li>
          <li>
            <strong>Price negotiation:</strong> Negotiate with respect and fairness. Do not engage
            in any form of price manipulation or harassment.
          </li>
          <li>
            <strong>Exchange location:</strong> Exchanges should take place in a safe and public
            area on our campus. We recommend using the campus security desk as a meeting point.
          </li>
          <li>
            <strong>Reporting:</strong> If you encounter any issues or violations of our policies,
            please report them to our team immediately. We will take appropriate actions to ensure
            the safety and security of our community.
          </li>
        </ul>
        <p>
          By using our platform, you agree to abide by our policies and guidelines. We reserve the
          right to suspend or terminate any account that violates our policies. Thank you for being
          a part of our campus community!
        </p>
      </section>
    </Layout>
  )
}

export default privacyPolicy
