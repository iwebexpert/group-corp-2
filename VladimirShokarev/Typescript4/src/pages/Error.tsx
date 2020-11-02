import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";

export const Error: React.FC<{}> = () => {
    return (<>
        <HeaderContainer />
        <div className="about-container">
            <h1 className="about-title">Error 404</h1>
            <p className="about-text">Page not found.</p>
        </div>
    </>
    );
};