//? SHOWS ALL REGISTERD USERS, AND THEIR COUNTS FOR POSTS, COMMENTS, LIKES, BOOKMARKS AND PHOTOS. 
//? SHOWS THE USER'S COVER IMAGE, AVATAR, USERNAME AND EMAIL ADDRESS
//? USES A SWITCH COMPONENT TO DEACTIVATE/ACTIVATE USERS
//? WE USE A TRADITIONAL HTML TABLE STRUCTURE, WITH TABLE ROWS BEING MAPPED FOR EACH USER
//? THE COMPONENT IS WRAPPED IN A HEADLESSUI DISCLOSURE COMPONENT TO SHIFT THE CONTENT DOWN AND DISPLAY A NEW USER FORM (NOT IMPLEMENTED)
//? useSWR FETCHES THE DATA FROM THE API AND DISPLAYS THE WAITING COMPONENT WHILE WE FETCH THE DATA
//? AUTHENTICATION STATUS IS CHECKED ON THE SERVER. UNAUTHED USERS ARE SHOWN THE LOGIN PAGE

import { withAuthUser, AuthAction, withAuthUserSSR } from 'next-firebase-auth'
import { Disclosure } from '@headlessui/react'
import useSWR from 'swr'

import { PlusCircleIcon } from '@heroicons/react/outline'
import AddUserForm from 'components/add-new-user'
import Waiting from 'components/await-data'
import Layout from 'layouts/layout'
import Title from 'components/title'
import Row from 'components/table-row-users'

const Users = () => {

    const { data, error } = useSWR('/api/users/fetch-all')
    if (error) return <div>failed to load</div>
    if (!data) return <Waiting/>

    return (
        <div className='flex flex-col items-start justify-start w-full'>
            <Disclosure>
                <div className="flex items-center justify-between w-full h-24 px-4 dark:bg-bgdark shrink-0">
                    <Title title='Users'/>
                    <Disclosure.Button className='flex items-center justify-center h-10 px-6 space-x-2 text-black duration-200 border border-black rounded-lg hover:bg-black hover:text-white dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-black'>
                        <PlusCircleIcon className="w-6 h-6"/>
                        <span className='font-semibold tracking-tight'>Add a user</span>
                    </Disclosure.Button>
                </div>

                <Disclosure.Panel className="w-full">
                    <AddUserForm/>
                </Disclosure.Panel>

                <table className="w-full table-auto">
                    <thead className=''>
                        <tr className='font-light text-gray-600 bg-gray-100 border-t border-b border-gray-200 h-14 dark:bg-itemdark dark:border-borderdark dark:text-gray-400'>
                            <th className='pl-4 pr-4 text-xs font-normal text-center uppercase'>active</th>
                            <th className='font-normal text-left'>Name</th>
                            <th className='font-normal text-center'>Date Joined</th>
                            <th className='font-normal text-center'>Posts</th>
                            <th className='font-normal text-center'>Comments</th>
                            <th className='font-normal text-center'>Likes</th>
                            <th className='font-normal text-center'>Saved</th>
                            <th className='pr-4 font-normal text-center'>Photos</th>
                            <th className='font-normal text-left'>Username</th>
                            <th className='font-normal text-right'>Email Address</th>
                            <th className='font-normal text-center'>Cover</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data && data.map(user => (
                        <Row
                            key={user.id}
                            photoUrl={user.photoUrl}
                            name={user.name}
                            username={user.username}
                            email={user.email}
                            coverImage={user.coverImage}
                            createdAt={user.createdAt}
                            userId={user.id}
                            isActive={user.active}
                        />
                    ))}
                    </tbody>
                </table>
            </Disclosure>
        </div>
    )
}

export const getServerSideProps = withAuthUserSSR({ whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,})(async () => {})
const UsersWithAuth = withAuthUser({ whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN, })(Users)

//? NEXT.JS PERSISTENT LAYOUTS
UsersWithAuth.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}
export default UsersWithAuth
