import { useCallback, useRef, useEffect, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getWhere } from 'pages/api/db'
import { ParsedUrlQuery } from 'querystring'
// import EditorTools from '../../components/EditorConstants'

interface Params extends ParsedUrlQuery {
  slug: string
}

const BlogDetail = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [editorTools, setEditorTools] = useState()

  const ReactEditorJS = createReactEditorJS()
  //   console.log(data)

  const editorJS = useRef(null)

  const handleInitialize = useCallback((instance) => {
    editorJS.current = instance
  }, [])

  useEffect(() => {
    const importConstants = async () => {
      const tools = (await import('../../components/EditorConstants')).default
      setEditorTools(tools)
    }

    importConstants()
  }, [])

  if (!editorTools) {
    return <div>...Loading</div>
  }

  return (
    <div className="prose  lg:prose-xl">
      <ReactEditorJS
        tools={editorTools}
        defaultValue={JSON.parse(data[0].description)}
        readOnly
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as Params
  //   console.log(slug)
  //make an ajax call to get your blog
  const post = await getWhere(slug)
  //   console.log('post', post)
  //sample return for testing. Here you will want to return the blog received through ajax call.
  return {
    props: {
      data: post,
    },
  }
}

export default BlogDetail
