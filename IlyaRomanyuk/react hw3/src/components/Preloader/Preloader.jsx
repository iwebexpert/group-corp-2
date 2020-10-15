import React from 'react'
import preloader from './../../img/preloader.gif'

export const Preloader = () => {
    return (
        <div className="preloader">
            <img className="preloader-img" src={preloader} alt="" />
        </div>
    )
}
