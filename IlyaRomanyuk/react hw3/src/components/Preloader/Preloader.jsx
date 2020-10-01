import React from 'react'
import preloader from './../../img/preloader.gif'

export const Preloader = () => {
    return (
        <div className="preloader">
            <p>Bot is typing</p>
            <img className="preloader-img" src={preloader} alt="" />
        </div>
    )
}
