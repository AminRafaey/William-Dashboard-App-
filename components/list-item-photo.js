//? USED IN THE PHOTOS PAGE
//? SHOWS EACH PHOTO POSTED IN THE APP
//? USES A CHECKBOX TO CALL THE SETPHOTOVISIBILITY FUNCTION
//? WE USE MANTINE NOTIFICATIONS TOO COMMUNICATE THE STATUS TO THE USER

//? WE USE AN HTML IMG TAG HERE AS NEXT/IMAGE TAG BREAKS THE TABLE

import { useState } from 'react'
import Image from 'next/image'
import { useNotifications } from '@mantine/notifications';
import axios from 'axios'

const ListItem = ({ createdAt, photo, photoId, posterAvatar, posterName, isPublished }) => {

    const [checked, setChecked] = useState(isPublished);
    const notifications = useNotifications();

    const setPhotoVisibility = async (e) => {
        setChecked(e.currentTarget.checked)
        await axios.put('/api/photos/set-status', {
            photoId: photoId,
            isPublished: e.currentTarget.checked
        })
        if (!checked) {
            notifications.showNotification({
                color: 'green',
                title: 'Photo published',
                message: 'Photo published successfully',
            })
        }
        if (checked) {
            notifications.showNotification({
                color: 'red',
                title: 'Photo removed',
                message: 'Photo is no longer visible',
            })
        }
    }

    var date = new Date(createdAt);
    const posted = date.toLocaleString('en-us',{weekday:'short', month:'short', year:'numeric', day:'numeric'})+
          " at "+date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="flex flex-col justify-between p-2 border border-gray-300 rounded-lg h-60 dark:bg-itemdark dark:border-borderdark">
            <div>
                <div className='w-full h-40 rounded-md bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900'>
                    {photo ? <img src={photo} className="object-cover object-center w-full h-full rounded-md" alt=""  /> : null}
                </div>
                
                <span className="text-sm text-gray-800 dark:text-gray-400">{posted}</span>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center justify-start space-x-1">
                    {posterAvatar ? <Image src={posterAvatar} width="24px" height="24px" className="object-cover object-center w-6 h-6 rounded-full" alt=""/> : null}
                    <span className="text-sm text-gray-800 dark:text-gray-300">{posterName}</span>
                </div>
                <div>
                    <input type="checkbox" className="w-5 h-5 text-gray-600 border border-gray-300 rounded focus:outline-none ring-0 focus:ring-0" checked={checked} onChange={(e) => setPhotoVisibility(e)}/>
                </div>
            </div>
        </div>
    )
}

export default ListItem
