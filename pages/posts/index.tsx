import * as React from 'react'
import useSWR from 'swr'
import { IPost, IFormInputs } from '../../interfaces/'
import PostForm from '@components/forms/PostForm'
import Post from '@components/Post'
import { addPost, updatePost } from '../api/db'

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

function Posts() {
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

export default Posts
