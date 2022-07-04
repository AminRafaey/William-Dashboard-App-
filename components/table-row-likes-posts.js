//? USED IN THE LIKES PAGE TO DISPLAY LIKED POSTS
//? SHOWS INDIVIDUAL LIKES

import Image from 'next/image'

import useUserLikeCount from 'hooks/useUserLikeCount'
import usePostLikeCount from 'hooks/usePostLikeCount'

const ListItem = ({ createdAt, postId, postImage, postText, postCreatorAvatar, postCreatorName, likerAvatar, likerName, userId }) => {

    const {data:postLikes} = usePostLikeCount(postId)
    const {data:userLikes} = useUserLikeCount(userId)

    var date = new Date(createdAt);
    const added = date.toLocaleString('en-us',{weekday:'short', month:'short', year:'numeric', day:'numeric'})+
          " at "+date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr className='font-light text-black border-b border-gray-100 hover:bg-gray-50 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400 hover:dark:bg-borderdark'>
            <td className='flex flex-row items-center justify-start pl-2 h-14'>
                <div className='w-20 h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 bg-animate-pulse'>
                    {postImage && <Image src={postImage} alt="" width="80px" height="40px" className='object-cover object-center w-20 h-10'/>}
                </div>
                <span className='h-6 max-w-sm pl-2 line-clamp-1'>{postText}</span>
            </td>
            <td className='text-center'>{added}</td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    <Image src={postCreatorAvatar} width="32px" height="32px" alt="" className='object-cover object-center w-8 h-8 rounded-full'/>
                </div>
                <span className='h-6 pl-2'>{postCreatorName}</span>
            </td>
            <td className='text-center'>{postLikes}</td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    {likerAvatar!==null&&<Image src={likerAvatar} width="32px" height="32px" alt="" className='object-cover object-center w-8 h-8 rounded-full'/>}
                    {likerAvatar===null&&<div className='flex items-center justify-center w-8 h-8 text-xs font-light uppercase bg-gray-200 rounded-full'>no image</div>}
                </div>
                <span className='h-6 pl-2'>{likerName}</span>
            </td>
            <td className='text-center'>{userLikes}</td>
        </tr>
    )
}

export default ListItem