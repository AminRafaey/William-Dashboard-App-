//? USED IN THE USERS PAGE
//? SHOWS INDIVIDUAL USER RECORDS

import Image from 'next/image'

//? GET COUNTS
import useUserPostCount from 'hooks/useUserPostCount'
import useUserCommentCount from 'hooks/useUserCommentCount'
import useUserLikeCount from 'hooks/useUserLikeCount'
import useUserBookmarkCount from 'hooks/useUserBookmarkCount'
import useUserPhotoCount from 'hooks/useUserPhotoCount'

import Switch from 'components/switch-user'

const Row = ({ coverImage, createdAt, email, isActive, name, photoUrl, userId, username }) => {

    const {data:dataPosts} = useUserPostCount(userId)
    const {data:dataComments} = useUserCommentCount(userId)
    const {data:dataLikes} = useUserLikeCount(userId)
    const {data:dataBookmarks} = useUserBookmarkCount(userId)
    const {data:dataPhotos} = useUserPhotoCount(userId)

    var date = new Date(createdAt);
    const joined = date.toLocaleString('en-us',{weekday:'short', month:'short', year:'numeric', day:'numeric'})+
          " at "+date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <tr className='font-light text-black border-b border-gray-100 h-14 hover:bg-gray-50 dark:bg-itemdark dark:border-borderdark dark:text-gray-400 hover:dark:bg-borderdark'>
            <td className='text-center'>
                <div className='flex flex-row justify-center'>
                    <Switch isActive={isActive} userId={userId}/>
                </div>
            </td>
            <td className='flex flex-row items-center justify-start h-14'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
                    {photoUrl &&
                    <Image src={photoUrl} width="32px" height="32px" alt="" className='object-cover object-center w-8 h-8 rounded-full'/>
                    }
                </div>
                <span className='pl-2'>{name}</span>
            </td>
            <td className='text-center'>{joined}</td>
            <td className='text-center'>{dataPosts === 0 ? '-' : dataPosts}</td>
            <td className='text-center'>{dataComments === 0 ? '-' : dataComments}</td>
            <td className='text-center'>{dataLikes === 0 ? '-' : dataLikes}</td>
            <td className='text-center'>{dataBookmarks === 0 ? '-' : dataBookmarks}</td>
            <td className='pr-4 text-center'>{dataPhotos === 0 ? '-' : dataPhotos}</td>
            <td className='text-left'>{username}</td>
            <td className='text-right'>{email}</td>
            <td className='flex flex-row justify-center'>
                <div className='w-20 h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 bg-animate-pulse'>
                    {coverImage &&
                    <Image src={coverImage ? coverImage : undefined} width="80px" height="40px" alt="" className="object-cover object-center w-20 h-10"/>
}
                </div>
            </td>
        </tr>
    )
}

export default Row
