import React from 'react'
// import ReactDOMServer from 'react-dom/server'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IPost, IFormInputs } from '../../interfaces'

// import ReactMarkdown from 'react-markdown'
// import gfm from 'remark-gfm'
// import breaks from 'remark-breaks'
// import rehypeRaw from 'rehype-raw'
// import dynamic from 'next/dynamic'
import Editor from '@components/editor'
import { uploadImage } from 'pages/api/db'
import 'react-markdown-editor-lite/lib/index.css'

import SimpleMDE from 'easymde'

// const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
//   ssr: false,
// })

type FormProps = {
  initialValues: { post?: IPost | null } | null
  onSave: (data: IFormInputs) => void
}

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required()

const PostForm = (props: FormProps) => {
  // const { post } = props.initialValues
  // console.log(post)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // getValues,
    setValue,
  } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    // defaultValues: {
    //   title: props.initialValues?.post?.title,
    //   description: props.initialValues?.post?.description,
    // },
  })
  const onSubmit = (data: IFormInputs) => {
    let formData = data
    if (props.initialValues?.post?.id) {
      formData.id = props.initialValues?.post.id
    }
    props.onSave(data)
    reset()
  }

  // const guid = () => {
  //   const s4 = () =>
  //     Math.floor((1 + Math.random()) * 0x10000)
  //       .toString(16)
  //       .substring(1)
  //   // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  //   return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
  // }

  React.useEffect(() => {
    console.log(props.initialValues)
    if (props.initialValues?.post) {
      setValue('title', props.initialValues.post?.title)
      setValue('description', props.initialValues.post?.description)
    }
    //eslint-disable-next-line
  }, [props.initialValues])

  const onUploadImage = (
    image: File,
    onSuccess: (data: unknown) => void,
    onError: (data: unknown) => void
  ) => {
    try {
      console.log(image)
      // const objId = guid()
      return new Promise(async (resolve) => {
        const downloadURL = await uploadImage(image)

        onSuccess(downloadURL)
        resolve({ data: { link: downloadURL } })
      })
    } catch (error) {
      return onError(error)
    }
  }

  const customRendererOptions = React.useMemo(() => {
    return {
      shortcuts: { toggleFullScreen: null, toggleSideBySide: null },
      showIcons: ['table', 'upload-image'],
      hideIcons: ['image', 'side-by-side', 'fullscreen'],
      uploadImage: true,
      imageUploadFunction: onUploadImage,
    } as SimpleMDE.Options
  }, [])

  // console.log('form values', getValues())

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" className="leading-7 text-sm text-gray-600">
        Title
      </label>
      <input
        {...register('title')}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <p className="text-sm text-red-500">{errors.title?.message}</p>
      <label htmlFor="description" className="leading-7 text-sm text-gray-600">
        Description
      </label>
      <Controller
        control={control}
        name="description"
        render={({
          field: { onChange, value },
          // fieldState: { invalid, isTouched, isDirty, error },
          // formState,
        }) => (
          <Editor
            value={value}
            options={customRendererOptions}
            // getLineAndCursor={getLineAndCursorCallback}
            // onChange={(value: any) => onChange(value)}
            onChange={onChange}
            // onUploadImage={onUploadImage}
          />
        )}
      />
      <p className="text-sm text-red-500">{errors.description?.message}</p>

      <button
        type="submit"
        className="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
      >
        Save
      </button>
    </form>
  )
}
export default PostForm
