import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <main className='w-full h-screen flex justify-center items-center'>
    <ClipLoader
        color={'white'}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
      />
    </main>
  )
}
