import React, { useRef } from 'react'

export const NavbarForm = ({ addNewChat }) => {
    const chat = useRef(null)

    const addChat = () => {

        if (chat.current.value) {
            addNewChat(chat.current.value);
            chat.current.value = '';
        }
    }

    return (
        <div className="navbar__form">
            <div className="navbar__input">
                <input ref={chat} type="text" placeholder="Add new chat" />
            </div>
            <button className="navbar__btn" onClick={addChat}>+</button>
        </div>
    )
}
