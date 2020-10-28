import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";

export const Home: React.FC<{}> = () => {
    return (<>
        <HeaderContainer />
        <div className="about-container">
            <h1 className="about-title">Главная страница</h1>
        </div>
    </>
    )
}