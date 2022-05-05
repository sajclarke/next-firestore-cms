import React from 'react'
import RichTextEditor from '@components/RTEditor'
import { useForm, Controller } from 'react-hook-form'
import { addPost } from './api/db'
// import * as Quill from 'quill'
// import { ImageResize } from 'quill-image-resize-module'

// Quill.register('modules/imageResize', ImageResize)

interface IFormInputs {
  description: string
}

const initialValue =
  '**Homework**~italic~<p>Your initial <b>html value</b> or an empty string to init editor without value</p>'

function MyPage() {
  //   const [value, onChange] = React.useState(initialValue)

  const {
    // register,
    handleSubmit,
    control,
    // formState: { errors },
    reset,
    // setValue,
  } = useForm<IFormInputs>({
    mode: 'onChange',
    //    resolver: yupResolver(schema),
    defaultValues: {
      //   title: props.initialValues?.post?.title,
      description: initialValue,
    },
  })

  const onSubmit = (data: IFormInputs) => {
    let formData = data
    console.log(formData)

    // if (props.initialValues?.post?.id) {
    //   formData.id = props.initialValues?.post.id
    // }
    // props.onSave(data)

    addPost({ title: '', description: formData.description })
    reset()
  }

  //   const modules = React.useMemo(
  //     () => ({
  //       ImageResize: {
  //         modules: ['Resize', 'DisplaySize', 'Toolbar'],
  //       },
  //     }),
  //     []
  //   )

  return (
    <>
      <Controller
        control={control}
        name="description"
        render={({
          field: { onChange, value },
          // fieldState: { invalid, isTouched, isDirty, error },
          // formState,
        }) => <RichTextEditor value={value} onChange={onChange} />}
      />
      <button
        // type="submit"
        onClick={handleSubmit(onSubmit)}
        className="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
      >
        Save
      </button>
    </>
  )
}

export default MyPage
