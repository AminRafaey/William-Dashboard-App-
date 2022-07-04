//? SHOWS ALL COMMENTS, AND THE NUMBER OF REPLIES AND LIKES FOR EACH COMMENT, THE DATE POSTED, THE USER WHO POSTED THE COMMENT, AND THE POST THE COMMENT WAS POSTED ON 
//? USES A SWITCH COMPONENT TO HIDE/SHOW COMMENTS - WE HANDLE HIDDEN COMMENTS IN THE MAIN DESKTOP/PHONE APP THROUGH SIMPLE TERNARY CODE - COMMENT DATA IS PASSED TO THE APP, ALONG WITH A 'PUBLISHED' STATUS. IF PUBLISHED === FALSE SHOW THIS, ELSE SHOW THE COMMENT. 
//? WE USE A TRADITIONAL HTML TABLE STRUCTURE, WITH TABLE ROWS BEING MAPPED FOR EACH USER
//? THE COMPONENT IS WRAPPED IN A HEADLESSUI DISCLOSURE COMPONENT TO SHIFT THE CONTENT DOWN AND DISPLAY A NEW USER FORM (NOT IMPLEMENTED)
//? useSWR FETCHES THE DATA FROM THE API AND DISPLAYS THE WAITING COMPONENT WHILE WE FETCH THE DATA
//? AUTHENTICATION STATUS IS CHECKED ON THE SERVER. UNAUTHED USERS ARE SHOWN THE LOGIN PAGE

import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth'
import useSWR from 'swr'

import { PlusCircleIcon } from '@heroicons/react/outline'
import Waiting from 'components/await-data'
import Layout from 'layouts/layout'
import Title from 'components/title'
import Row from 'components/table-row-comments'

const Comments = () => {

    const { data, error } = useSWR('/api/comments/fetch-all')
    if (error) return <div>failed to load</div>
    if (!data) return <Waiting/>

    return (
        <div className='flex flex-col items-start justify-start w-full'>
            <div className="flex items-center justify-between flex-shrink-0 w-full h-24 px-4">
                <Title title='Comments'/>
                <button className='flex items-center justify-center h-10 px-6 space-x-2 text-black duration-200 border border-black rounded-lg hover:bg-black hover:text-white'>
                    <PlusCircleIcon className="w-6 h-6"/>
                    <span className='font-semibold tracking-tight'>Add a post</span>
                </button>
            </div>

            <table className="w-full table-auto">
                <thead className=''>
                    <tr className='font-light text-gray-600 bg-gray-100 border-t border-b border-gray-200 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400'>
                        <th className='pl-4 pr-4 text-xs font-normal text-center uppercase'>visible</th>
                        <th className='max-w-sm font-normal text-left'>Comment</th>
                        <th className='font-normal text-center'>Replies</th>
                        <th className='font-normal text-center'>Likes</th>
                        <th className='font-normal text-center'>Date Posted</th>
                        <th className='font-normal text-left'>User</th>
                        <th className='max-w-xs font-normal text-left'>Post</th>
                    </tr>
                </thead>
                <tbody className=''>
                {data && data.map(comment => (
                    <Row
                        key={comment._id}
                        commentId={comment._id}
                        comment={comment.comment}
                        createdAt={comment.createdAt}
                        userAvatar={comment.userData[0]?.photoUrl}
                        usersName={comment.userData[0]?.name}
                        postImage={comment.photoData[0]?.photo}
                        post={comment.postData[0]?.post}
                        published={comment.published}
                    />
                ))}
                </tbody>
            </table>


        </div>
    )
}

export const getServerSideProps = withAuthUserSSR({ whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,})(async () => {})
const CommentsWithAuth = withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN, })(Comments)

//? NEXT.JS PERSISTENT LAYOUTS
CommentsWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default CommentsWithAuth
