import React from "react";

function Icon({ size, stroke }) {
    return (
        <svg className={`w-${size} h-${size}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={`${stroke}`} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
    )
}

export default React.memo(Icon);