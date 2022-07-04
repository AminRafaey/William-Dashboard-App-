//? USED IN THE COMMENTS PAGE
//? SHOWS INDIVIDUAL COMMENTS
//? IMPORTS A SWITCH COMPONENT WHICH HANDLES THE DATABASE CALLS FOR SETTING THE COMMENT TO PUBLISHED TRUE/FALSE

//? WE USE AN HTML IMG TAG HERE AS NEXT/IMAGE TAG BREAKS THE TABLE

import Image from 'next/image'

// HOOKS
import useCommentLikeCount from 'hooks/useCommentLikeCount'
import useCommentReplyCount from 'hooks/useCommentReplyCount'

import Switch from 'components/switch-comment'

const Row = ({ comment, commentId, createdAt, published, post, postImage, userAvatar, usersName }) => {

    const {data:dataLikes} = useCommentLikeCount(commentId)
    const {data:dataReplies} = useCommentReplyCount(commentId)

    var date = new Date(createdAt);
    const joined = date.toLocaleString('en-us',{weekday:'short', month:'short', year:'numeric', day:'numeric'})+
          " at "+date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr className='font-light text-black border-b border-gray-100 h-14 hover:bg-gray-50 dark:bg-itemdark dark:border-borderdark dark:text-gray-400 hover:dark:bg-borderdark'>
            <td className='text-center'>
                <div className='flex flex-row justify-center'>
                    <Switch published={published} commentId={commentId}/>
                </div>
            </td>
            <td className='max-w-sm overflow-y-hidden text-sm dark:text-gray-100'>{comment}</td>
            <td className='text-center text-black dark:text-gray-100'>{dataLikes === 0 ? '-' : dataLikes}</td>
            <td className='text-center text-black dark:text-gray-100'>{dataReplies === 0 ? '-' : dataReplies}</td>
            <td className='text-sm text-center text-black dark:text-gray-100'>{joined}</td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    <img src={userAvatar ? userAvatar : null} alt="" className='object-cover object-center w-8 h-8 rounded-full'/>
                </div>
                <span className='pl-2 text-sm text-black dark:text-gray-100'>{usersName}</span>
            </td>
            <td className='text-sm text-left dark:text-gray-100'>
                <span className='max-w-xs text-black line-clamp-1 dark:text-gray-100'>{post}</span>
            </td>
        </tr>
    )
}

export default Row