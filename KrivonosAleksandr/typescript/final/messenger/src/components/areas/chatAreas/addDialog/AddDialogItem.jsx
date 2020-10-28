import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import botImg from "../../../../img/user.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";

export const AddDialogItem = (props) => {

    const addDialog = () => {
        let newDialog = {
            name: props.name,
            id: props.id,
        }
        props.onAddDialog(newDialog);
    }

    return (
        <div className="dialog_link" onClick={addDialog}>
            <div className="user_account user_dialog_account">
                <div className="user_account__imgLink">
                    <div className="user_account__img" style={{background: `url(${botImg}) top/cover no-repeat`}}>
                    </div>
                </div>
                <div className="user_wrapper">
                    <div className="user_account__info">
                        <div className="user_account__infoLink">{props.name}</div>
                        <div className="state state_online">
                            <FontAwesomeIcon icon={faCircle}/>
                            Online
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}