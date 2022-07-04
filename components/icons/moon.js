import React from "react";

function Icon({ size, stroke }) {
    return (
        <svg className={`w-${size} h-${size}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={`${stroke}`} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    )
}

export default React.memo(Icon);