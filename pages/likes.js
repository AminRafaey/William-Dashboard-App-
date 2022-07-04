//? SHOWS ALL LIKES, POSTS OR COMMENTS, SORTED BY THE DATE THE LIKE WAS CREATED AT, MOST RECENT FIRST 
//? WE SWITCH BETWEEN DISPLAYING POSTS AND COMMENTS DATA USING A HEADLESSUI TAB COMPONENT
//? BOTH SETS OF DATA ARE FECTHED HERE AND PASSED TO THEIR RESPECTIVE COMPONENTS
//? WE USE A TRADITIONAL HTML TABLE STRUCTURE, WITH TABLE ROWS BEING MAPPED FOR EACH USER
//? AUTHENTICATION STATUS IS CHECKED ON THE SERVER. UNAUTHED USERS ARE SHOWN THE LOGIN PAGE

import { useState } from 'react'
import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth'
import { Tab } from '@headlessui/react'
import useSWR from 'swr'

import Waiting from 'components/await-data'
import Layout from 'layouts/layout'
import Title from 'components/title'
import RowPosts from 'components/table-row-likes-posts'
import RowComments from 'components/table-row-likes-comments'

const Likes = () => {

    const {data:dataPosts, error} = useSWR('/api/likes/posts/fetch-all')
    const {data:dataComments, error:errorComments } = useSWR('/api/likes/comments/fetch-all')

    const [viewing, setViewing] = useState('Post')

    if (error) return <div>failed to load</div>
    if (errorComments) return <div>failed to load comment data</div>
    if (!dataPosts) return <Waiting/>
    if (!dataComments) return <Waiting/>

    return (
        <div className='flex flex-col items-start justify-start w-full'>
            <div className="flex items-center justify-between flex-shrink-0 w-full h-24 px-4">
                <Title title={`${viewing} Likes`}/>
            </div>

            <Tab.Group onChange={(index) => {
                index===0 ? setViewing('Post') : setViewing('Comment')
            }}>
                <Tab.List className='flex flex-row pl-4 my-4 space-x-4'>
                    <Tab className={({ selected }) => selected ? 'px-3 py-1 text-black border-2 border-newblue rounded-md dark:text-gray-200' : 'px-3 py-1 text-black border-2 border-gray-300 rounded-md dark:border-borderdark dark:text-gray-400'}>Posts</Tab>
                    <Tab className={({ selected }) => selected ? 'px-3 py-1 text-black border-2 border-newblue rounded-md dark:text-gray-200' : 'px-3 py-1 text-black border-2 border-gray-300 rounded-md dark:border-borderdark dark:text-gray-400'}>Comments</Tab>
                </Tab.List>
                <Tab.Panels className='w-full'>
                    <Tab.Panel className='w-full'>
                        <table className="w-full table-auto">
                            <thead className=''>
                                <tr className='font-light text-gray-600 bg-gray-100 border-t border-b border-gray-200 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400'>
                                    <th className='max-w-sm pl-2 font-normal text-left'>Post</th>
                                    <th className='font-normal text-center'>Date Added</th>
                                    <th className='font-normal text-left'>Poster</th>
                                    <th className='font-normal text-center'>Post Likes</th>
                                    <th className='font-normal text-left'>Liker</th>
                                    <th className='font-normal text-text-center'>User&apos;s Total Likes</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                            {dataPosts && dataPosts.map(likePost => (
                                <RowPosts
                                    key={likePost._id}
                                    postId={likePost.postData[0]?._id}
                                    createdAt={likePost.createdAt}
                                    postImage={likePost.photoData[0]?.photo}
                                    postText={likePost.postData[0]?.post}
                                    postCreatorAvatar={likePost.postCreatorData[0]?.photoUrl}
                                    postCreatorName={likePost.postCreatorData[0]?.name}
                                    likerAvatar={likePost.userData[0]?.photoUrl}
                                    likerName={likePost.userData[0]?.name}
                                    userId={likePost.userData[0]?._id}
                                />
                            ))}
                            </tbody>
                        </table>
                    </Tab.Panel>
                    <Tab.Panel className='w-full'>
                        <table className="w-full table-auto">
                            <thead className=''>
                                <tr className='font-light text-gray-600 bg-gray-100 border-t border-b border-gray-200 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400'>
                                    <th className='max-w-sm pl-2 font-normal text-left'>Comment</th>
                                    <th className='font-normal text-center'>Date Added</th>
                                    <th className='font-normal text-left'>Comment Poster</th>
                                    <th className='font-normal text-center'>Comment Likes</th>
                                    <th className='font-normal text-left'>Liker</th>
                                    <th className='font-normal text-center'>User&apos;s Total Likes</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                            {dataComments && dataComments.map(likeComment => (
                                <RowComments
                                    key={likeComment._id}
                                    commentId={likeComment.commentData[0]?._id}
                                    createdAt={likeComment.createdAt}
                                    comment={likeComment.commentData[0]?.comment}
                                    commentCreatorAvatar={likeComment.creatorData[0]?.photoUrl}
                                    commentCreatorName={likeComment.creatorData[0]?.name}
                                    likerAvatar={likeComment.userData[0]?.photoUrl}
                                    likerName={likeComment.userData[0]?.name}
                                    userId={likeComment.userData[0]?._id}
                                />
                            ))}
                            </tbody>
                        </table>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

        </div>
    )
}

export const getServerSideProps = withAuthUserSSR({ whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,})(async () => {})
const LikesWithAuth = withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN, })(Likes)

//? NEXT.JS PERSISTENT LAYOUTS
LikesWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default LikesWithAuth
