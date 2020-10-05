import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
export function Home() {
    return (<>
        <Header />
        <div className="about-container">
            <h1 className="about-title">Главная страница</h1>
            <p className="about-text">Добро пожаловать на наш сайт!</p>
            <ForumOutlinedIcon className="home-icon" />
        </div>
        <Footer />
    </>
    )
}