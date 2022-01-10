import Link from 'next/link'
import { IPost } from '../interfaces/'

interface IProps {
  post: IPost
  onClick: (post: IPost) => void
}

const Post = ({ post, onClick }: IProps) => {
  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:flex-grow" onClick={() => onClick(post)}>
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
  )
}

export default Post
