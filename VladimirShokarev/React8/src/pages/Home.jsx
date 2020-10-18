import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";

export function Home() {
    return (<>
        <HeaderContainer />
        <div className="about-container">
            <h1 className="about-title">Главная страница</h1>
        </div>
    </>
    )
}