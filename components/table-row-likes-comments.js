//? USED IN THE LIKES PAGE TO DISPLAY LIKED COMMENTS
//? SHOWS INDIVIDUAL LIKED COMMENTS

import Image from 'next/image'

//? FETCH COUNTS
import useCommentLikeCount from "hooks/useCommentLikeCount";
import useUserLikeCount from "hooks/useUserLikeCount";

const ListItemComments = ({ createdAt, comment, commentId, commentCreatorAvatar, commentCreatorName, likerAvatar, likerName, userId }) => {

    const {data:likes} = useCommentLikeCount(commentId)
    const {data:userLikes} = useUserLikeCount(userId)

    var date = new Date(createdAt);
    const added = date.toLocaleString('en-us',{weekday:'short', month:'short', year:'numeric', day:'numeric'})+
          " at "+date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr className='font-light text-black border-b border-gray-100 hover:bg-gray-50 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400 hover:dark:bg-borderdark'>
            <td className='flex flex-row items-center pl-2 text-left h-14'>
                <span className='max-w-sm px-2 py-1 bg-gray-100 border border-gray-200 rounded line-clamp-1 dark:bg-darkthree dark:text-gray-400 dark:border-borderdark'>{comment}</span>
            </td>
            <td className='text-center'>{added}</td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    <Image src={commentCreatorAvatar} width="32px" height="32px" alt="" className='object-cover object-center w-8 h-8 rounded-full'/>
                </div>
                <span className='h-6 pl-2'>{commentCreatorName}</span>
            </td>
            <td className='text-center'>{likes}</td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    <Image src={likerAvatar} width="32px" height="32px" alt="" className='object-cover object-center w-8 h-8 rounded-full'/>
                </div>
                <span className='h-6 pl-2'>{likerName}</span>
            </td>
            <td className='text-center'>{userLikes}</td>
        </tr>
    )

}

export default ListItemComments