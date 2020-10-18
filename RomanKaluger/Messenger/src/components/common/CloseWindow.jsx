import React from "react";
import {useDispatch} from "react-redux";

export const CloseWindow = ({actionClose}) => {
    return (
        <img
            onClick={actionClose}
            className={'DeleteSign'}
            alt={'DeleteSign'}
            src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
    );
};
