import Layout from '@/components/layout'

const about = () => {
  return (
    <Layout meta={{ name: 'About' }}>
      <div className="prose my-10 mx-auto xl:prose-lg">
        <h1>About the project!</h1>
        <p>
          This project proposes the development of an online marketplace that will enable students
          to buy and sell used goods within the campus community. The primary objective is to create
          a secure, convenient, and user-friendly platform that addresses the challenges faced by
          college students when exchanging used goods. This platform aims to promote sustainability
          by reducing waste and facilitating the reuse of items, while also providing a
          cost-effective and practical solution for students&apos; needs.
        </p>
        <p>
          The proposed online marketplace will address the limitations of traditional approaches to
          buying and selling used goods by providing a modern and secure platform that expands the
          reach beyond campus, facilitates specific item search, allows for flexible scheduling and
          remote transactions, and promotes sustainable practices. By incorporating features such as
          secure payment options, communication tools, and buyer/seller rating systems, this
          platform will increase trust and safety, while also promoting community building.
        </p>
        <p>
          The successful implementation of this project has the potential to significantly impact
          the sustainability efforts of the NIT community while also addressing the practical needs
          of students. This project aims to promote a culture of reuse and reduce waste within the
          campus community, while also providing a convenient and cost-effective solution for
          students&apos; needs.
        </p>
        <div className="font-italic">
          <ul>
            <li>Giridhar Talla</li>
            <li>Deekshith Bathini</li>
            <li>Kamal Banothu</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default about
