//? SWITCH BETWEEN LIGHT AND DARK MODE

import { useEffect, useState } from 'react'
import {  MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'

const ThemeButton = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    //? When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <div className='w-full'>
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex flex-row items-center justify-start w-full px-4 text-black duration-200 border-r-4 border-transparent hover:text-white hover:border-newblue hover:bg-newblue h-14 dark:text-gray-400 dark:hover:bg-newblue dark:hover:text-gray-100">
                <div className='flex items-center justify-center w-6 h-6 rounded dark:bg-zinc-800 dark:group-hover:bg-newblue'>
                    {theme === 'light' ? (
                    <MoonIcon className="w-4 h-4 fill-current"/>
                    ) : (
                    <SunIcon className="w-4 h-4 fill-current"/>
                    )}
                </div>
                <span className="ml-2 font-light tracking-tight">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
        </div>
    )
}

export default ThemeButton
