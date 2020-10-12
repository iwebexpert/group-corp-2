import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import botImg from "../../../../../img/user.png";
import {connect} from "react-redux";

class DialogNameClass extends Component{

    deleteDialog = () =>{
        let dialog = {
            id: this.props.id,
            name: this.props.name,
        };
        this.props.onDeleteDialog(dialog);
    }

    render() {
        let lastMsg = '';
        if(this.props.lastMessage.length > 0){
            lastMsg = this.props.lastMessage[this.props.lastMessage.length - 1].text;
        }else{
            lastMsg = 'Начните общение первым';
        }

        return (
            <NavLink to={"/chats/" + this.props.id} className="dialog_link">
                <div className="user_account user_dialog_account">
                    <div className="user_account__imgLink">
                        <div className="user_account__img" style={{background: `url(${botImg}) top/cover no-repeat`}}>
                        </div>
                    </div>
                    <div className="user_wrapper">
                        <div className="user_account__info">
                            <div className="user_account__infoLink">{this.props.name}</div>
                        </div>
                        <div className="user_account__lastMessage" style={this.props.fire?{background: "transparent"}: {background: "#9addfb"}}>
                            {lastMsg}
                        </div>
                    </div>
                </div>
                {this.props.showDeleteBtns ? <button className="delete_dialog"><FontAwesomeIcon icon={faTrash}/></button> : <div/>}
                {/*<button className="delete_dialog" onClick={this.deleteDialog}><FontAwesomeIcon icon={faTrash}/></button>*/}
            </NavLink>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const showDeleteBtns = state.chats.activateDelete;
    const {onDeleteDialog} = ownProps;
    return {showDeleteBtns, onDeleteDialog};
}

export const DialogName = connect(mapStateToProps)(DialogNameClass);
