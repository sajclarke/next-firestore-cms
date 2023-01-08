// import type { NextPage } from 'next'
import useSWR from 'swr'
import * as React from 'react'
import type { ReactElement } from 'react'
// import { useRouter } from 'next/router'
// import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { addPost, updatePost } from './api/db'
import { IPost, IFormInputs } from '../interfaces/'
import PostForm from '@components/forms/PostForm'
import Layout from '@components/layouts/SiteWrapper'
import Post from '@components/Post'

export async function getStaticProps() {
  // `getStaticProps` is executed on the server side.
  // const posts = await getPosts()
  return {
    props: {
      // fallback: {
      //   '/api/posts': posts,
      // },
    },
  }
}

function Home() {
  const { data, error, mutate: refreshPosts } = useSWR('/api/posts')

  const [currentPost, setCurrentPost] = React.useState<IPost | null>(null)

  const handlePost = (data: IFormInputs) => {
    // console.log(data)
    if (data.id) {
      updatePost(data)
    } else {
      addPost(data)
    }
    refreshPosts()
    setCurrentPost(null)
  }

  const handleClickPost = (data: IPost) => {
    // console.log(data)
    setCurrentPost(data)
  }
  if (error) return <div>An error has occurred.</div>
  if (!data) return <div>loading...</div>
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <PostForm
          onSave={handlePost}
          initialValues={currentPost ? { post: currentPost } : null}
        />
        {data.map((post: IPost) => (
          <Post key={post.id} post={post} onClick={handleClickPost} />
        ))}
      </div>
    </section>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
