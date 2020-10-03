import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import pic from "../../src/img/about.png";

export function About() {
    return (<>
        <Header />
        <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <p className="about-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, aliquid.</p>
            <img className="about-img" src={pic} alt="Messenger" />
        </div>
        <Footer />
    </>
    )
}