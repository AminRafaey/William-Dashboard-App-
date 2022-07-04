//? ENTRY POINT TO OUR APP AS STIPULATED IN LIBS/INITAUTH.JS
//? DISPLAYS AND COUNTS UP TOTAL COUNTS FOR USERS, POSTS, COMMENTS, PHOTOS AND BOOKMARKS
//? DISPLAYS LATEST POSTS, LATEST USER SIGNUPS, LATEST COMMENTS AND LATEST IMAGES
//? ALSO SHOWS SAMPLE HARD-CODED ENGAGEMENT DATA THAT COULD BE IMPLEMENTED IF YOU WISH USING THE LAST ACESSED DATA POSTED BELOW

import { useEffect } from 'react'
import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth'
import axios from 'axios'

import Layout from 'layouts/layout'
import Title from 'components/title'
import Count from 'components/overview/item-count'
import LatestPosts from 'components/latest-posts'
import LatestUsers from 'components/new-users'
import LatestComments from 'components/latest-comments'
import LatestImages from 'components/latest-images'
import Value from 'components/overview/value-display'

const Overview = () => {

    //? UPDATES OUR MONGO DATABASE WITH A LAST ACCSSSED TIMESTAMP - NOT CURRENTLY USED BUT USEFUL FOR IMPLEMENTING EXTRA STATS AND CALCULATING CHANGE OVER TIME
    useEffect(() => {
        async function updateLastAccessed() {
            try {
                axios.post('/api/dashboard/last-accessed')
                console.log('updated last accessed')
            }
            catch {
                console.log('error updating last accessed')
            }
        }
        updateLastAccessed()
    },[])

    return (
        <div className='flex flex-col items-start justify-start w-full'>
            <div className="flex items-center justify-between flex-shrink-0 w-full h-24 px-4">
                <Title title="Overview"/>
            </div>
            <div>
                <h2 className="px-4 text-2xl font-light text-black capitalize dark:text-zinc-300">totals</h2>
            </div>
            <div className="grid w-full grid-cols-6 gap-5 px-4 mt-8">
                <Count target="users">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </Count>
                <Count target="posts">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                </Count>
                <Count target="comments">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </Count>
                <Count target="photos">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </Count>
                <Count target="likes">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </Count>
                <Count target="bookmarks">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </Count>
            </div>

            {/* HARD-CODED DATA - USED FOR EXAMPLE */}
            <div className="mt-8">
                <h2 className="px-4 text-2xl font-light text-black capitalize dark:text-zinc-300">engagement</h2>
            </div>
            <div className="grid w-full grid-cols-5 gap-5 px-4 mt-8">
                <div className='flex flex-col items-start justify-between p-4 border border-gray-200 h-36 rounded-2xl bg-gray-50 dark:bg-itemdark dark:border-borderdark'>
                    <div className='flex flex-row items-center justify-start w-full'>
                        <div className='flex items-center justify-center rounded-full w-7 h-7 dark:text-white bg-gradient-to-b from-[#1CBEFB] to-[#1D6EE7]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        </div>
                        <span className='ml-3 text-lg font-light capitalize dark:text-zinc-300'>Posts per user</span>
                    </div>
                    <div className='flex flex-row items-end justify-between w-full'>
                        <Value value={8}/>
                        <div className='flex items-center justify-center w-12 h-6 mb-2 text-sm font-light uppercase bg-red-400 bg-opacity-50 rounded-full text-zinc-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <span className=''>6%</span>    
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-between p-4 border border-gray-200 h-36 rounded-2xl bg-gray-50 dark:bg-itemdark dark:border-borderdark'>
                    <div className='flex flex-row items-center justify-start w-full'>
                        <div className='flex items-center justify-center rounded-full w-7 h-7 dark:text-white bg-gradient-to-b from-[#1CBEFB] to-[#1D6EE7]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        </div>
                        <span className='ml-3 text-lg font-light capitalize dark:text-zinc-300'>Comments per user</span>
                    </div>
                    <div className='flex flex-row items-end justify-between w-full'>
                        <Value value={3}/>
                        <div className='flex items-center justify-center w-12 h-6 mb-2 text-sm font-light uppercase bg-green-400 bg-opacity-50 rounded-full text-zinc-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <span className=''>2%</span>    
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-between p-4 border border-gray-200 h-36 rounded-2xl bg-gray-50 dark:bg-itemdark dark:border-borderdark'>
                    <div className='flex flex-row items-center justify-start w-full'>
                        <div className='flex items-center justify-center rounded-full w-7 h-7 dark:text-white bg-gradient-to-b from-[#1CBEFB] to-[#1D6EE7]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        </div>
                        <span className='ml-3 text-lg font-light capitalize dark:text-zinc-300'>Likes per user</span>
                    </div>
                    <div className='flex flex-row items-end justify-between w-full'>
                        <Value value={3}/>
                        <div className='flex items-center justify-center w-12 h-6 mb-2 text-sm font-light uppercase bg-opacity-50 rounded-full bg-zinc-400 text-zinc-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                            <span className=''>7%</span>    
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-between p-4 border border-gray-200 h-36 rounded-2xl bg-gray-50 dark:bg-itemdark dark:border-borderdark'>
                    <div className='flex flex-row items-center justify-start w-full'>
                        <div className='flex items-center justify-center rounded-full w-7 h-7 dark:text-white bg-gradient-to-b from-[#1CBEFB] to-[#1D6EE7]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        </div>
                        <span className='ml-3 text-lg font-light capitalize dark:text-zinc-300'>Media per user</span>
                    </div>
                    <div className='flex flex-row items-end justify-between w-full'>
                        <Value value={2}/>
                        <div className='flex items-center justify-center w-12 h-6 mb-2 text-sm font-light uppercase bg-green-400 bg-opacity-50 rounded-full text-zinc-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                            <span className=''>3%</span>    
                        </div>
                    </div>
                </div>
                
                <div className='flex flex-col items-start justify-between p-4 border border-gray-200 h-36 rounded-2xl bg-gray-50 dark:bg-itemdark dark:border-borderdark'>
                    <div className='flex flex-row items-center justify-start w-full'>
                        <div className='flex items-center justify-center rounded-full w-7 h-7 dark:text-white bg-gradient-to-b from-[#1CBEFB] to-[#1D6EE7]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        </div>
                        <span className='ml-3 text-lg font-light capitalize dark:text-zinc-300'>Bookmarks per user</span>
                    </div>
                    <div className='flex flex-row items-end justify-between w-full'>
                        <Value value={6}/>
                        <div className='flex items-center justify-center w-12 h-6 mb-2 text-sm font-light uppercase bg-green-400 bg-opacity-50 rounded-full text-zinc-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <span className=''>5%</span>    
                        </div>
                    </div>
                </div>


            </div>
            <div className='grid w-full grid-cols-4 gap-5 px-4 mt-8'>
                <LatestPosts/>
                <LatestComments/>
                <LatestUsers/>
                <LatestImages/>
            </div>
        </div>
    )
}

export const getServerSideProps = withAuthUserSSR({ whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,})(async () => {})
const OverviewWithAuth = withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN, })(Overview)
OverviewWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default OverviewWithAuth
