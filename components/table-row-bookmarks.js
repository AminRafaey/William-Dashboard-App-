//? USED IN THE BOOKMARKS PAGE
//? SHOWS INDIVIDUAL BOOKMARK RECORDS

import Image from 'next/image'

//? COLLECT COUNTS
import usePostBookmarkCount from 'hooks/usePostBookmarkCount'
import useUserBookmarkCount from 'hooks/useUserBookmarkCount'

const Row = ({ createdAt, postImage, postText, postCreatorAvatar, postCreatorName, bookmarkerAvatar, bookmarkerName, postId }) => {

    const {data:dataUserBookmarks} = useUserBookmarkCount(postId)
    const {data:dataPostBookmarks} = usePostBookmarkCount(postId)

    var date = new Date(createdAt);
    const joined = date.toLocaleString('en-us',{weekday:'short', month:'short', year:'numeric', day:'numeric'})+
          " at "+date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr className='font-light text-black border-b border-gray-100 hover:bg-gray-50 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400 hover:dark:bg-borderdark'>
        
            <td className='flex flex-row items-center justify-start pl-2 h-14'>
                <div className='w-20 h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 bg-animate-pulse'>
                    {postImage &&<Image src={postImage} alt="" width="80px" height="40px" className='object-cover object-center w-20 h-10'/>}
                </div>
                <span className='h-6 max-w-sm pl-2 line-clamp-1'>{postText}</span>
            </td>
            <td className='text-center'>{joined}</td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    <Image src={postCreatorAvatar} width="32px" height="32px" alt="" className='object-cover object-center w-8 h-8 rounded-full'/>
                </div>
                <span className='h-6 pl-2'>{postCreatorName}</span>
            </td>
            <td className='text-center'>{dataPostBookmarks === 0 ? '-' : dataPostBookmarks}</td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    <Image src={bookmarkerAvatar} width="32px" height="32px" alt="" className='object-cover object-center w-8 h-8 rounded-full'/>
                </div>
                <span className='h-6 pl-2'>{bookmarkerName}</span>
            </td>
            <td className='text-center'>{dataUserBookmarks}</td>
        </tr>
    )
}

export default Row