import React from "react";
import {useSelector} from "react-redux";

export default ({message}) => {
    const curUser = useSelector(s => s.app.curUser);
    return (
        <div className={`Message${curUser._id === message.author ? ' MyMessage' :''}`}>
            <div className={'MessageAuthor'}>{message.authorName}</div>
            {message.text}
        </div>
    );
}
