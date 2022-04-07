import Header from '@editorjs/header'
import List from '@editorjs/list'
import Image from '@editorjs/image'

import { uploadImage } from 'pages/api/db'

const constants = {
  header: Header,
  list: { class: List },
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file: File) {
          const downloadURL = await uploadImage(file)
          return {
            success: 1,
            file: {
              url: downloadURL,
            },
          }
        },
      },
    },
  },
}

export default constants
