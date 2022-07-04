import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth'
import useSWR from 'swr'

import { PlusCircleIcon } from '@heroicons/react/outline'
import Waiting from 'components/await-data'
import Layout from 'layouts/layout'
import Title from 'components/title'
import Row from 'components/table-row-bookmarks'

const Bookmarks = () => {

    const { data, error } = useSWR('/api/bookmarks/fetch-all')
    if (error) return <div>failed to load</div>
    if (!data) return <Waiting/>

    return (
        <div className='flex flex-col items-start justify-start w-full'>
            <div className="flex items-center justify-between flex-shrink-0 w-full h-24 px-4">
                <Title title='Bookmarks'/>
            </div>


            <table className="w-full table-auto">
                <thead className=''>
                    <tr className='font-light text-gray-600 bg-gray-100 border-t border-b border-gray-200 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400'>
                        <th className='max-w-sm pl-2 font-normal text-left'>Post</th>
                        <th className='font-normal text-center'>Bookmark Added</th>
                        <th className='font-normal text-left'>Post Author</th>
                        <th className='font-normal text-center'>Total Bookmarks</th>
                        <th className='font-normal text-left'>Bookmarker</th>
                        <th className='font-normal text-text-center'>User&apos;s Total Bookmarks</th>
                    </tr>
                </thead>
                <tbody className=''>
                {data && data.map(bookmark => (
                    <Row
                        key={bookmark._id}
                        createdAt={bookmark.createdAt}
                        postImage={bookmark.photoData[0]?.photo}
                        postText={bookmark.postData[0].post}
                        postCreatorAvatar={bookmark.postCreatorData[0]?.photoUrl}
                        postCreatorName={bookmark.postCreatorData[0]?.name}
                        bookmarkerAvatar={bookmark.userData[0]?.photoUrl}
                        bookmarkerName={bookmark.userData[0]?.name}
                        postId={bookmark.postData[0]?._id}
                        userId={bookmark.userData[0]?._id}
                    />
                ))}
                </tbody>
            </table>

        </div>
    )
}

export const getServerSideProps = withAuthUserSSR({ whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,})(async () => {})
const BookmarksWithAuth = withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN, })(Bookmarks)
BookmarksWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default BookmarksWithAuth
