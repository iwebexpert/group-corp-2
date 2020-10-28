import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import "../css/style.css"

export const About: React.FC<{}> = () => {
    return (<>
        <HeaderContainer />
        <div className="about-container">
            <h1 className="about-title">О нас</h1>
        </div>
    </>
    )
}