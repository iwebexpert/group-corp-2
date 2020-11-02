import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import { Footer } from "../components/Footer";
import pic from "../../src/img/about.png";

export const About: React.FC<{}> = () => {
    return <>
        <HeaderContainer />
        <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <p className="about-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, aliquid.</p>
            <img className="about-img" src={pic} alt="Messenger" />
        </div>
        <Footer />
    </>
};