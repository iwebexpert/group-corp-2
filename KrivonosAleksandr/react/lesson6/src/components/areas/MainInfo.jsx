import React from "react";
import Avatar from "./mainInfo/Avatar";
import MainInfoContent from "./mainInfo/MainInfoContent";
import {MainInfoContentContainer} from "../../containers/MainInfoContentContainer";

const MainInfo = () => {
    return <div className="main-info">
        <Avatar />
        <MainInfoContentContainer />
    </div>
}

export default MainInfo;