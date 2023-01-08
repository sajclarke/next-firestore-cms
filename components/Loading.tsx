import { CgSpinner } from 'react-icons/cg'

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 grid place-items-center w-full h-full min-h-screen bg-gray-400 bg-opacity-50">
      <div className="flex items-center">
        <CgSpinner className="w-5 h-5 animate-spin mr-3" />
        Loading
      </div>
    </div>
  )
}

export default Loading
