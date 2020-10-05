import React from "react";
import Header from "./areas/HeaderArea";
import {ChatArea} from "./areas/ChatArea";
import MenuArea from "./areas/MenuArea";

const Layout = () => {
    return (
        <>
            <Header/>
            <MenuArea />
        </>
    );
}

export default Layout;