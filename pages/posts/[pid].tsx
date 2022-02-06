import React from 'react'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getPost } from 'pages/api/db'
import { ParsedUrlQuery } from 'querystring'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import breaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'
interface Params extends ParsedUrlQuery {
  pid: string
}

const Post = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { post } = props
  // console.log(post)
  return (
    <div className="container px-5 py-24 mx-auto">
      <div key={post.id} className="py-8 flex flex-wrap md:flex-nowrap">
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
            {post.title}
          </h2>
          {/* <p className="leading-relaxed">{post.description}</p> */}
          <ReactMarkdown
            className="prose lg:prose-xl w-max-none"
            remarkPlugins={[gfm, breaks]}
            rehypePlugins={[rehypeRaw]}
            linkTarget="_blank"
          >
            {post.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
  // const router = useRouter()
  const { pid } = context.params as Params
  // console.log(pid)
  const post = await getPost(pid)
  // const data = pid ? await getPost(pid) : null

  console.log('response', post)
  return {
    props: { post }, // will be passed to the page component as props
  }
}

export default Post
