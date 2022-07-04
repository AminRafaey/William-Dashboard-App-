//? USED IN THE LAYOUT.JS COMPONENT
//? CYCLES BACK AND FORTH BETWEEN PAGES

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, DotsHorizontalIcon } from '@heroicons/react/outline'

const Header = () => {

    const router = useRouter();

    return (
        <div className='flex items-center flex-shrink-0 w-full h-20 border-b border-gray-200 dark:border-borderdark'>
            <div className='flex flex-row items-center justify-between w-full px-4'>
                <button onClick={() => router.back()} className='p-3 text-gray-600 border border-transparent rounded-lg dark:hover:bg-itemdark dark:hover:border-borderdark dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 hover:border-gray-200'>
                    <ChevronDoubleLeftIcon className="inline-block w-8 h-8"/>
                </button>
            
                <div className='flex flex-row items-center justify-end space-x-8'>
                    <Link href={
                        router.pathname == '/overview' ? '/users' : 
                        router.pathname == '/users' ? '/posts' : 
                        router.pathname == '/posts' ? '/photos' :
                        router.pathname == '/photos' ? '/comments' :
                        router.pathname == '/comments' ? '/likes' : 
                        router.pathname == '/likes' ? '/bookmarks' :
                        router.pathname == '/bookmarks' ? '/overview' : 
                        '/overview'}><a>
                        <button className='p-3 text-gray-600 border border-transparent rounded-lg dark:hover:bg-itemdark dark:hover:border-borderdark dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 hover:border-gray-200'>
                            <ChevronDoubleRightIcon className="inline-block w-8 h-8"/>
                        </button>
                    </a></Link>
                    <DotsHorizontalIcon className="inline-block w-8 h-8 text-gray-600 dark:text-gray-400"/>
                </div>
            </div>
        </div>
    )
}

export default Header
