import React from "react";
import {Header} from "./areas/HeaderArea";
import {MenuArea} from "./areas/MenuArea";

const Layout: React.FC = () => {
    return (
        <>
            <Header/>
            <MenuArea />
        </>
    );
}

export default Layout;