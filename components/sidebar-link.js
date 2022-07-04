//? USED IN SIDEBAR COMPONENT FOR DISPLAYING LINKS

import { useRouter } from 'next/router';
import Link from 'next/link';

const SidebarLink = ({ children, slug, text }) => {
    const router = useRouter();
    return (
        <div className='w-full'>
            <Link href={slug}>
                <a className={router.pathname == `${slug}`
                ? "border-r-4 border-newblue flex flex-row items-center justify-start px-4 w-full text-newblue dark:text-white dark:border-white"
                : "text-black px-4 flex flex-row items-center justify-start hover:text-white border-r-4 border-transparent hover:border-newblue duration-200 hover:bg-newblue dark:text-gray-400 cursor-pointer dark:hover:bg-newblue dark:hover:text-gray-100 group"}>
                    <button className='flex flex-row items-center justify-start w-full h-14'>
                        <div className='flex items-center justify-center w-6 h-6 rounded dark:bg-zinc-800 dark:group-hover:bg-newblue'>
                            {children}
                        </div>
                        <span className='ml-2 font-light tracking-tight'>{text}</span>
                    </button>
                </a>
            </Link>
        </div>
    )
}

export default SidebarLink
