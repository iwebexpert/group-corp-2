import React, { useRef } from 'react'

export const NavbarSearch = ({ findNeedChat }) => {
    const inputLink = useRef(null)

    return (
        <div className="navbar__input">
            <input onChange={() => findNeedChat(inputLink.current.value)} ref={inputLink} type="text" placeholder="Search" />
        </div>
    )
}

