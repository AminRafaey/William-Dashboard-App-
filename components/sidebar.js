//? SIDEBAR COMPONENT
//? USES useAuthUser AND withAuthUser TO ALLOW US TO USE THE SIGNOUT() FUNCTION

import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import { ChartSquareBarIcon, UserIcon, ViewGridIcon, PhotographIcon, ChatAltIcon, HeartIcon, BookmarkIcon, LogoutIcon } from '@heroicons/react/outline'
import NavItem from 'components/sidebar-link'
import ThemeButton from 'components/theme-button'
import Logo from 'components/icons/logo-use'
import Link from 'next/link'

const Sidebar = () => {

    const AuthUser = useAuthUser();

    return (
        <div className='flex flex-col items-start justify-between w-64 h-full border-r border-gray-200 bg-gray-50 dark:bg-itemdark dark:border-borderdark'>
            <div className='flex flex-col items-start justify-start w-full'>
                <div className='flex items-center justify-start w-full h-20 mb-4 border-b border-gray-200 dark:border-borderdark'>
                    <Link href='/'>
                        <a className='pl-4'><Logo height="8"/></a>
                    </Link>
                </div>
                <NavItem text="Overview" slug="/overview">
                    <ChartSquareBarIcon className="w-4 h-4"/>
                </NavItem>
                <NavItem text="Users" slug="/users">
                    <UserIcon className="w-4 h-4"/>
                </NavItem>
                <NavItem text="Posts" slug="/posts">
                    <ViewGridIcon className="w-4 h-4"/>
                </NavItem>
                <NavItem text="Photos" slug="/photos">
                    <PhotographIcon className="w-4 h-4"/>
                </NavItem>
                <NavItem text="Comments" slug="/comments">
                    <ChatAltIcon className="w-4 h-4"/>
                </NavItem>
                <NavItem text="Likes" slug="/likes">
                    <HeartIcon className="w-4 h-4"/>
                </NavItem>
                <NavItem text="Bookmarks" slug="/bookmarks">
                    <BookmarkIcon className="w-4 h-4"/>
                </NavItem>
            </div>
            <div className='w-full pb-6'>
                <ThemeButton/>
                <div className='w-full'>
                    <button onClick={() => {AuthUser.signOut()}} className='flex flex-row items-center justify-start w-full px-4 text-black duration-200 border-r-4 border-transparent cursor-pointer hover:text-white hover:border-newblue hover:bg-newblue h-14 dark:text-gray-400 dark:hover:bg-newblue dark:hover:text-gray-100'>
                        <div className='flex items-center justify-center w-6 h-6 rounded dark:bg-zinc-800 dark:group-hover:bg-newblue'>
                            <LogoutIcon className="w-4 h-4"/>
                        </div>
                        <span className='ml-2 font-light tracking-tight'>Log out</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default withAuthUser()(Sidebar)
