//? SAMPLE ADD USER FORM USED IN THE USERS PAGE
//? FUNCTIONALITY NOT IMPLEMENTED

import {useRef, useState} from 'react'
import Image from 'next/image'
import { PlusCircleIcon } from '@heroicons/react/outline'

const AddNewUser = () => {

    const nameRef =  useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [profilePic, setProfilePic] = useState(null)

    const [loading, setLoading] = useState(false)

    async function handleNewUser(e) {
        e.preventDefault()

    }

    return (
        <form onSubmit={handleNewUser} className='flex flex-row items-center justify-start w-full h-48 px-4 space-x-4'>
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full">
                {profilePic ? <img src={URL.createObjectURL(profilePic)} className="object-cover object-center w-20 h-20 rounded-full"/> :
                <Image src="/avatar.png" alt="logo" width="80" height="80" />}
                <label htmlFor="profile-pic-input" className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 mb-1 mr-1 bg-gray-300 border border-gray-500 rounded-full cursor-pointer">
                    x
                    <input
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        accept="image/x-png,image/jpeg"
                        id="profile-pic-input"
                        name="profile-input"
                        className="sr-only"
                    />
                </label>
            </div>
            <div className=''>
                <label className='block'>
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-400'>Name</span>
                    <input ref={nameRef} type='text' className='w-full h-12 px-4 border border-gray-200 rounded-lg dark:border-borderdark dark:bg-itemdark'/>
                </label>
            </div>
            <div className=''>
                <label className='block'>
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-400'>Email</span>
                    <input ref={emailRef} type='email' className='w-full h-12 px-4 border border-gray-200 rounded-lg dark:border-borderdark dark:bg-itemdark'/>
                </label>
            </div>
            <div className=''>
                <label className='block'>
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-400'>Password</span>
                    <input ref={passwordRef} type='password' className='w-full h-12 px-4 border border-gray-200 rounded-lg dark:border-borderdark dark:bg-itemdark'/>
                </label>
            </div>
            <div className=''>
                <label className='block'>
                    <span className='text-sm font-semibold text-gray-600 dark:text-gray-400'>Confirm password</span>
                    <input ref={passwordConfirmRef} type='email' className='w-full h-12 px-4 border border-gray-200 rounded-lg dark:border-borderdark dark:bg-itemdark'/>
                </label>
            </div>
            <div className='flex flex-row items-center justify-end'>
                <button className='flex items-center justify-center h-10 px-6 mt-6 space-x-2 text-black duration-200 border border-black rounded-lg hover:bg-black hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-black'>
                    <PlusCircleIcon className="w-6 h-6"/>
                    <span className='font-semibold tracking-tight'>Add a user</span>
                </button>
            </div>
        </form>
    )
}

export default AddNewUser
