import React, { useState } from "react";
import ReactDom from "react-dom";
import pic from "../img/chat.png";
import { Messenger } from "../components/Messenger";


ReactDom.render(
    <>
        <img src={pic} />
        <Messenger />

    </>
    , document.getElementById("root"));