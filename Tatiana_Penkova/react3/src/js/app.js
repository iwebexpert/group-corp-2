import React from "react";
import ReactDom from "react-dom";
import { Messenger } from "../components/Messenger";
import { Header } from "../components/Header";
import { Chats } from "../components/Chats";
import { Footer } from "../components/Footer";

ReactDom.render(
    <>
        <Header />
        <div className="main">
            <div className="chats">
                <Chats />
            </div>

            <Messenger />
        </div>

        <Footer />
    </>
    , document.getElementById("root"));