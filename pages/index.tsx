import type { NextPage } from 'next'
import Link from 'next/link'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getPosts } from './api/db'
import { IPost } from '../interfaces/'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context
  res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`)
  const data = await getPosts()

  return {
    props: { posts: data }, // will be passed to the page component as props
  }
}

const Home: NextPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // console.log(posts)
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {posts.map((post: IPost) => (
          <div key={post.id} className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:flex-grow">
              <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                {post.title}
              </h2>
              <p className="leading-relaxed">{post.description}</p>
              <Link href={`/posts/${post.id}`} passHref>
                <a className="text-indigo-500 inline-flex items-center mt-4">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Home
