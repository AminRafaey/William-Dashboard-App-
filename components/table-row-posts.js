//? USED IN THE POSTS PAGE
//? SHOWS INDIVIDUAL POSTS

//? WE USE AN HTML IMG TAG HERE AS NEXT/IMAGE TAG BREAKS THE TABLE

import Image from 'next/image'

//? GET COUNTS
import usePostLikeCount from 'hooks/usePostLikeCount'
import usePostCommentCount from 'hooks/usePostCommentCount'
import usePostBookmarkCount from 'hooks/usePostBookmarkCount'

import Switch from 'components/switch-post'

const Row = ({ createdAt, name, post, photos, photoUrl, published, postId }) => {

    const {data:dataLikes} = usePostLikeCount(postId)
    const {data:dataComments} = usePostCommentCount(postId)
    const {data:dataBookmarks} = usePostBookmarkCount(postId)

    var date = new Date(createdAt);
    const joined = date.toLocaleString('en-us',{weekday:'short', month:'short', year:'numeric', day:'numeric'})+
          " at "+date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr className='font-light text-black border-b border-gray-100 h-14 hover:bg-gray-50 dark:bg-itemdark dark:border-borderdark dark:text-gray-400 hover:dark:bg-borderdark'>
            <td className='text-center'>
                <div className='flex flex-row justify-center'>
                    <Switch published={published} postId={postId}/>
                </div>
            </td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-20 h-10 border-none'>
                    {photos[0]?.photo!==null && <img src={photos[0]?.photo} alt="" className='object-cover object-center w-20 h-10 border-none'/>}
                </div>
                <span className='max-w-2xl pl-2 line-clamp-1'>{post}</span>
            </td>
            <td className='text-center'>{joined}</td>
            <td className='text-center'>{dataLikes === 0 ? '-' : dataLikes}</td>
            <td className='text-center'>{dataComments === 0 ? '-' : dataComments}</td>
            <td className='text-center'>{dataBookmarks === 0 ? '-' : dataBookmarks}</td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    <Image src={photoUrl} width="32px" height="32px" alt="" className='object-cover object-center w-8 h-8 rounded-full'/>
                </div>
                <span className='pl-2'>{name}</span>
            </td>
        </tr>
    )
}

export default Row