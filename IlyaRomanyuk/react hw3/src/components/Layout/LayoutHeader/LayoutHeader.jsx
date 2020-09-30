import React from 'react';
import m4 from './../../../img/mans/m4.png';

export const LayoutHeader = () => {
    return (
        <div className="content__header  header">
            <div className="navbar__about--head">
                <div className="navbar__img"><img src={m4} alt="" /></div>

                <div className="navbar__info">
                    <p className="navbar__info-name--color">Helga Källström</p>
                    <span className="navbar__info-mess">Available for freelance work.</span>
                </div>
            </div>
        </div>
    )
}
