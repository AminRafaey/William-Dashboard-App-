import { useEffect } from 'react'
import useSWR from 'swr'

import Value from 'components/overview/value-display'
import Title from 'components/overview/item-title'
import Waiting from 'components/overview/waiting'
import Error from 'components/overview/error'

const UserCount = ({ children, target }) => {

    const { data:totalCount, error, loading } = useSWR(`/api/${target}/count/get`)
    if (loading) return <Waiting/>
    if (error) return <Error/>

    // OPTIONAL - UPDATE A 'LAST ACCESSED' FIELD IN THE DASHBOARD COLLECTION OF THE DATABASE
    // useEffect(() => {
    //     async function updatePreviousCount() {
    //         try {axios.post('/api/users/count/update-last-accessed', {usersPreviousCount: totalCount,})}
    //         catch {console.log('error updating last accessed')}
    //     }
    //     updatePreviousCount()
    // },[totalCount])

    const randValue = Math.floor(Math.random() * (5 - 1) ) + 1;

    return (
        <div className='flex flex-col items-start justify-between p-4 border border-gray-200 h-36 rounded-2xl bg-gray-50 dark:bg-itemdark dark:border-borderdark'>
            <div className='flex flex-row items-center justify-start w-full'>
                <div className='flex items-center justify-center rounded-full w-7 h-7 dark:text-white bg-gradient-to-b from-[#1CBEFB] to-[#1D6EE7]'>
                    {children}
                </div>
                <span className='ml-3 text-lg font-light capitalize dark:text-zinc-300'>{target}</span>
            </div>
            <div className='flex flex-row items-end justify-between w-full'>
                <Value value={totalCount}/>
                <div className='flex items-center justify-center w-12 h-6 mb-2 text-sm font-light uppercase bg-green-400 bg-opacity-50 rounded-full text-zinc-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span className=''>{randValue}%</span>    
                </div>
            </div>
        </div>
    )
}

export default UserCount
