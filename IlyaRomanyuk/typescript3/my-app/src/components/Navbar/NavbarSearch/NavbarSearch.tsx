import React, { useRef } from 'react';

type NavbarSearch = {
    findNeedChat: (value: string) => void
}

export const NavbarSearch: React.FC<NavbarSearch> = ({ findNeedChat }) => {
    const inputLink = useRef<HTMLInputElement>(null)

    return (
        <div className="navbar__input">
            <input onChange={() => findNeedChat(inputLink.current!.value)} ref={inputLink} type="text" placeholder="Search" />
        </div>
    )
}

