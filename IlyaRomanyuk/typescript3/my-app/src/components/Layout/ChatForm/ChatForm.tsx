import React, { useRef } from 'react';
import { Button } from '@material-ui/core'
import { nanoid } from 'nanoid';

type ChatFormProps = {
    onMessageSend: (value: Message) => void
}

export const ChatForm: React.FC<ChatFormProps> = ({ onMessageSend }) => {
    const mess = useRef<HTMLTextAreaElement>(null);
    const person = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (mess.current!.value.trim() && person.current!.value.trim()) {
            let message = mess.current!.value;
            let author = person.current!.value;

            onMessageSend({ id: nanoid(), author, message, image: 'img/mans/m1.png' })

            mess.current!.value = '';
            person.current!.value = '';
        }
        return
    }

    const pressOnButton = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        if (event.keyCode === 13 && event.ctrlKey) handleClick()
    }

    return (
        < div className="content__footer  footer" >
            <div>
                <input onKeyDown={pressOnButton} ref={person} type="text" placeholder="Your name ... " />
            </div>

            <div>
                <textarea onKeyDown={pressOnButton} ref={mess} placeholder="Write a message" />
            </div>

            <Button variant="contained" color="primary" onClick={handleClick}>send</Button>
        </div >
    )
}
