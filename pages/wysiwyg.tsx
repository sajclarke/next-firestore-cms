import type { NextPage } from 'next'
// import { createReactEditorJS } from "react-editor-js";
import Head from 'next/head'

// const ReactEditorJS = createReactEditorJS();
import dynamic from 'next/dynamic'

const ReactEditorJS = dynamic(() => import('../components/Editor'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <ReactEditorJS />
      </main>
    </div>
  )
}

export default Home
