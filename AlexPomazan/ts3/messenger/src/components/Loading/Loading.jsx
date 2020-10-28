import React from "react";
import { HeaderContainer } from "../../containers/HeaderContainer";

import "./Loading.scss";

export const Loading = () => {
    return <>
        < HeaderContainer />
        <div className="container">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-4"></div>
            <div className="circle circle-5"></div>
        </div>
    </>
}; 