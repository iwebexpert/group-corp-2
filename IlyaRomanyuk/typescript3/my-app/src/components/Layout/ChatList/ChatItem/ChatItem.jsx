import React from 'react';
import classes from 'classnames';

export const ChatItem = ({ id, author, message, chatsId, image, title, deleteMessageAction }) => {
    let style = '';
    if (title !== author) {
        style = '--right';
    }

    const deleteMess = (id, chatsId) => {
        deleteMessageAction(chatsId, id)
    }

    return (
        <div className={classes(`wrapper__data${style}`)}>
            <div className={classes(`wrapper__icon${style}`)}>
                <img src={image} alt="" />
            </div>
            <div className={classes(`wrapper__info${style}`)}>
                <p className='wrapper__name'>{author}</p>
                <div className={classes(`wrapper__message${style}`)}>{message}<div onClick={() => deleteMess(id, chatsId)} className={classes(`wrapper__delete${style}`)}>+</div></div>
            </div>
        </div>
    )
}
