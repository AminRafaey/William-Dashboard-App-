import React from 'react'

const Logo = ({height}) => {
    return (
        <>
        <div className="block dark:hidden">
            <img src="/dashboard-logo-text-black.png" className={`h-${height}`}/>
        </div>
        <div className="hidden dark:block">
            <img src="/dashboard-logo-text-white.png" className={`h-${height}`}/>
        </div>
        </>
    )
}

export default Logo
