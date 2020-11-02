import React from 'react';
import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-regular-svg-icons";
import {Scrollbars} from "react-custom-scrollbars";
import {DialogItemCheck} from "./DialogItemCheck";

type AddDialogModalTypes = {
    friendsList: friendsPayload[];
    onAddDialog: (newDialog: newDialog) => void;
}

export const AddDialogModal: React.FC<AddDialogModalTypes> = (props) => {

    return (
        <Popup
            trigger={<button className="btn_send__new">Создать диалог</button>}
            modal
            nested
        >
            {(close: any) => (
                <div className="modal">
                    <button className="icon_template close" onClick={close}><FontAwesomeIcon icon={faWindowClose}/></button>
                    <div className="header">Начать диалог с...</div>
                    <hr/>
                    <div className="content">
                        <Scrollbars style={{width: 400, height: 450}}>
                        {' '}
                            <DialogItemCheck friendsList={props.friendsList} onAddDialog={props.onAddDialog}/>
                        </Scrollbars>
                    </div>
                </div>
            )}
        </Popup>
    );
};