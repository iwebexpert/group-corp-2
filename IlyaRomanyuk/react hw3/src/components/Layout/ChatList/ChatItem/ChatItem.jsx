import React from 'react';
import classes from 'classnames';

export const ChatItem = ({ author, message, image, title }) => {
    let style = '';
    if (title !== author) {
        style = '--right';
    }

    return (
        <div className={classes(`wrapper__data${style}`)}>
            <div className={classes(`wrapper__icon${style}`)}>
                <img src={image} alt="" />
            </div>
            <div className={classes(`wrapper__info${style}`)}>
                <p className='wrapper__name'>{author}</p>
                <div className={classes(`wrapper__message${style}`)}>{message}</div>
            </div>
        </div>
    )
}
