import React, { useRef } from 'react';
import { Button } from '@material-ui/core'
import m1 from './../../../img/mans/m1.png';

export const ChatForm = ({ onSendMessage }) => {
    const message = useRef(null);
    const person = useRef(null);

    const handleClick = () => {
        if (message.current.value.trim() && person.current.value.trim()) {
            let mess = message.current.value;
            let name = person.current.value;
            onSendMessage({ name, mess, image: m1, auth: true })
            message.current.value = '';
            person.current.value = '';
        }
        return
    }

    const pressOnButton = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) handleClick()
    }

    return (
        < div className="content__footer  footer" >
            <div>
                <input onKeyDown={pressOnButton} ref={person} type="text" placeholder="Your name ... " />
            </div>

            <div>
                <textarea onKeyDown={pressOnButton} ref={message} type="text" placeholder="Write a message"></textarea>
            </div>

            <Button variant="contained" color="primary" onClick={handleClick}>send</Button>
        </div >
    )
}
