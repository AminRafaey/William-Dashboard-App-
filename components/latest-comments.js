//? USED IN OVERVIEW PAGE
//? DISPLAYS A LIST OF THE LATEST COMMENTS

import useSWR from 'swr'
import Image from 'next/image'
import Waiting from 'components/await-data'
import ReactTimeAgo from 'react-time-ago'

const LatestComments = () => {

    const {data, error} = useSWR('/api/comments/fetch-latest')
    if (!data) return <Waiting/>

    return (
        <div className='flex flex-col items-start justify-start w-full'>
            <h2 className='mb-8 text-xl font-light text-black dark:text-zinc-300'>Latest comments</h2>
            {data && data.map(comment => (
                <div key={comment._id} className='flex flex-row items-center justify-start w-full py-4 border-b border-dashed dark:border-borderdark'>
                    <div className='flex items-center justify-center w-10 h-10 shrink-0'>
                        {data && <Image src={comment.userData[0]?.photoUrl} width={40} height={40} className='w-10 h-10 rounded-full' alt=''/>}
                    </div>
                    <div className='flex flex-col items-start justify-between w-full h-10 ml-3'>
                        <div className='flex flex-row items-center justify-between w-full'>
                            <div className='text-xs font-light text-black uppercase dark:text-zinc-500 line-clamp-1'>{comment.userData[0].name}</div>
                            <div className='text-xs font-light text-black dark:text-zinc-500 line-clamp-1'>
                                <ReactTimeAgo date={comment.createdAt} locale='en'/>
                            </div>
                        </div>
                        <div className='w-full mt-1 text-sm font-light text-black dark:text-zinc-300 line-clamp-1'>{comment.comment}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LatestComments