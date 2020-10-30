import React from "react";
import { HeaderContainer } from "../../containers/HeaderContainer";
import { Footer } from "../Footer";
import "./ChatsLoading.css";

export const ChatsLoading: React.FC<{}> = () => {
    return <>
        < HeaderContainer />
        <div className="loading-container">
            <div className="loadingWrap">
                <div className="loadingBoxes loadingBoxColour1"></div>
                <div className="loadingBoxes loadingBoxColour2"></div>
                <div className="loadingBoxes loadingBoxColour3"></div>
                <div className="loadingBoxes loadingBoxColour4"></div>
                <div className="loadingBoxes loadingBoxColour5"></div>
            </div>
        </div>
        <Footer />
    </>
};