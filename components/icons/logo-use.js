import React from 'react'

const Logo = ({height}) => {
    return (
        <>
            <div className="block dark:hidden">
                <img src="/reactstartupkit-blacktext.jpg" className={`h-${height}`}/>
            </div>
            <div className="hidden dark:block">
                <img src="/logo-dark-theme.png" className={`h-${height}`}/>
            </div>
        </>
    )
}

export default Logo
