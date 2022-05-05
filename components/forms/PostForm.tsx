import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IPost, IFormInputs } from '../../interfaces'

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
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  React.useEffect(() => {
    console.log(props.initialValues)
    if (props.initialValues?.post) {
      setValue('title', props.initialValues.post?.title)
      setValue('description', props.initialValues.post?.description)
    }
    //eslint-disable-next-line
  }, [props.initialValues])

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
      <textarea
        {...register('description')}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
