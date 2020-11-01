import React from 'react'

export const Preloader: React.FC<{}> = () => {
    return (
        <div className="preloader">
            <img className="preloader-img" src="img/preloader.gif" alt="" />
        </div>
    )
}
