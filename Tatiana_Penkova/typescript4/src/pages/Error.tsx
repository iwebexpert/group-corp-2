import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import { Footer } from "../components/Footer";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

export const Error: React.FC<{}> = () => {
    return <>
        <HeaderContainer />
        <div className="about-container">
            <h1 className="about-title">Error 404</h1>
            <p className="about-text">Page not found.</p>
            <ErrorOutlineOutlinedIcon className="error-page" />
        </div>
        <Footer />
    </>
};