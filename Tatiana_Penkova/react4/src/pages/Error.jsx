import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

export function Error() {
    return (<>
        <Header />
        <div className="about-container">
            <h1 className="about-title">Error 404</h1>
            <p className="about-text">Page not found.</p>
            <ErrorOutlineOutlinedIcon className="error-page" />
        </div>
        <Footer />
    </>

    )
}