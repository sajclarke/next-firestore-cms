import type { NextPage } from 'next'
// import Link from 'next/link'
import * as React from 'react'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getPosts, addPost, updatePost } from './api/db'
import { IPost, IFormInputs } from '../interfaces/'
import PostForm from '@components/forms/PostForm'
import Post from '@components/Post'

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
  const router = useRouter()

  const [currentPost, setCurrentPost] = React.useState<IPost | null>(null)

  const handlePost = (data: IFormInputs) => {
    // console.log(data)
    if (data.id) {
      updatePost(data)
    } else {
      addPost(data)
    }

    refreshData()
  }

  const handleClickPost = (data: IPost) => {
    console.log(data)
    setCurrentPost(data)
  }

  const refreshData = () => {
    //Hacky method of refreshing the page using server side data
    router.replace(router.asPath)
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <PostForm
          onSave={handlePost}
          initialValues={currentPost ? { post: currentPost } : null}
        />
        {posts.map((post: IPost) => (
          <Post key={post.id} post={post} onClick={handleClickPost} />
        ))}
      </div>
    </section>
  )
}

export default Home
