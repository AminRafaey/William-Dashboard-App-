//? USED IN OVERVIEW PAGE
//? DISPLAYS A LIST OF THE LATEST IMAGES

//? NEXT/IMAGE COMPONENT IS NOT USED AS IT'S CLUNKY IN THIS SITUATION

import useSWR from 'swr'
import Waiting from 'components/await-data'

const LatestPosts = () => {

    const { data, error } = useSWR('/api/photos/get-latest?limit=9')
    if (!data) return <Waiting/>

    return (
        <div className='flex flex-col items-start justify-start w-full'>
            <h2 className='mb-8 text-xl font-light text-black dark:text-zinc-300'>Latest images</h2>
            <div className='grid w-full grid-cols-3 overflow-hidden rounded-lg bg-gray-50 dark:bg-itemdark gap-0.5 border border-gray-200 dark:border-borderdark'>
            {data.map((photo) => (
                <div key={photo._id} className='w-full h-28'>
                    <img src={photo? photo.photo : undefined} className='object-cover object-center w-full h-28' alt=''/>
                </div>
            ))}
            </div>
        </div>
    )
}

export default LatestPosts