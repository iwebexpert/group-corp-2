import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import { Footer } from "../components/Footer";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";

export const Home: React.FC<{}> = () => {
    return <>
        <HeaderContainer />
        <div className="about-container">
            <h1 className="about-title">Главная страница</h1>
            <p className="about-text">Добро пожаловать на наш сайт!</p>
            <ForumOutlinedIcon className="home-icon" />
        </div>
        <Footer />
    </>
};