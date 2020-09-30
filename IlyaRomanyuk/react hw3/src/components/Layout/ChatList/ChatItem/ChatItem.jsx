import React from 'react';
import classes from 'classnames';

export const ChatItem = ({ name, mess, image, auth }) => {
    return (
        <div className={classes({ 'wrapper__data': !auth, 'wrapper__data--right': auth })}>
            <div className={classes({ 'wrapper__icon': !auth, 'wrapper__icon--right': auth })}>
                <img src={image} alt="" />
            </div>
            <div className={classes({ 'wrapper__info': !auth, 'wrapper__info--right': auth })}>
                <p className='wrapper__name'>{name}</p>
                <div className={classes({ 'wrapper__message': !auth, 'wrapper__message--right': auth })}>{mess}</div>
            </div>
        </div>
    )
}
