import React from 'react'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { Options } from 'easymde'
// import EasyMDE from 'easymde'
// import './index.css'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

interface IProps {
  value: string
  onChange: () => void
  options: Options
}
/* tslint:disable-next-line */
function Editor(props: IProps) {
  /**
   * @type {EasyMDE.Options}
   */
  const { onChange, options } = props

  return (
    <SimpleMDE
      {...props}
      onChange={onChange}
      className="WYSIWYG"
      options={options}
      //   options={{ ...defaultOptions, ...options }}
    />
  )
}

export default Editor
