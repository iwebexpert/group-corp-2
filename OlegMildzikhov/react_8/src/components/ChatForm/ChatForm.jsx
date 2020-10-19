import React, {useState} from "react";

export const ChatAddForm = (props) => {
    const [dataChat, setDataChat] = useState({
        text: ''
    });

    const onValueChange = (e) => {
        setDataChat({
            ...dataChat,
            text: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(dataChat.text.length === 0){
            alert('Введите название чата');
            return;
        }
        props.addNewChat(dataChat.text);


        setDataChat({
            ...dataChat,
            text: ''
        });
    };


    return (
        <form
            className="bottom-panel d-flex"
            onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="type here!"
                className="form-control new-post-label"
                onChange={onValueChange}
                value={dataChat.text}
            />
            <button
                type={"submit"}
                className={"btn btn-outline-secondary"}
            >add
            </button>
        </form>
    )
}