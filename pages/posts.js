//? SHOWS ALL POSTS AND RELEVANT INFORMATION
//? USES A SWITCH COMPONENT TO HIDE OR SHOW POSTS
//? WE USE A TRADITIONAL HTML TABLE STRUCTURE, WITH TABLE ROWS BEING MAPPED FOR EACH POST
//? useSWR FETCHES THE DATA FROM THE API AND DISPLAYS THE WAITING COMPONENT WHILE WE FETCH THE DATA
//? AUTHENTICATION STATUS IS CHECKED ON THE SERVER. UNAUTHED USERS ARE SHOWN THE LOGIN PAGE

import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth'
import useSWR from 'swr'

import { PlusCircleIcon } from '@heroicons/react/outline'
import Waiting from 'components/await-data'
import Layout from 'layouts/layout'
import Title from 'components/title'
import Row from 'components/table-row-posts'

const Posts = () => {

    const { data, error } = useSWR('/api/posts/fetch-all')
    if (error) return <div>failed to load</div>
    if (!data) return <Waiting/>

    return (
        <div className='flex flex-col w-full'>
            <div className="flex flex-row items-center justify-between w-full h-24 px-4 shrink-0">
                <Title title='Posts'/>
                <button className='flex items-center justify-center h-10 px-6 space-x-2 text-black duration-200 border border-black rounded-lg hover:bg-black hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-black'>
                    <PlusCircleIcon className="w-6 h-6"/>
                    <span className='font-semibold tracking-tight'>Add a post</span>
                </button>
            </div>
            <div className='w-full overflow-y-auto grow'>
                <table className="w-full table-auto">
                    <thead className='sticky top-0 z-10 bg-pink-600 h-14'>
                        <tr className='font-light text-gray-600 bg-gray-100 border-t border-b border-gray-200 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400'>
                            <th className='pl-4 pr-4 text-xs font-normal text-center uppercase'>published</th>
                            <th className='max-w-2xl font-normal text-left'>Post</th>
                            <th className='font-normal text-center'>Date Posted</th>
                            <th className='font-normal text-center'>Likes</th>
                            <th className='font-normal text-center'>Comments</th>
                            <th className='font-normal text-center'>Bookmarks</th>
                            <th className='font-normal text-left'>User</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data && data.map((post, i) => (
                        <Row
                            key={i}
                            postId={post._id}
                            post={post.post}
                            createdAt={post.createdAt}
                            photos={post.photoData}
                            name={post.userData[0].name}
                            photoUrl={post.userData[0].photoUrl}
                            published={post.published}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const getServerSideProps = withAuthUserSSR({ whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,})(async () => {})
const PostsWithAuth = withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN, })(Posts)

//? NEXT.JS PERSISTENT LAYOUTS
PostsWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default PostsWithAuth
