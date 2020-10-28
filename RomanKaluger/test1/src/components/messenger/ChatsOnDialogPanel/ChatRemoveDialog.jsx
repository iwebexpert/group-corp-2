import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import React, {useCallback, useState} from "react";
import {DbWorker} from "../../../utils/DbWorker";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {push} from 'connected-react-router';
import routesPaths from "../../../configs/routesPaths";
import {deleteChat, setLoading} from "../../../redux/actions";
import {useDispatch} from "react-redux";


export default function ({isDeleteCandidate, setIsDeleteCandidate, chat}) {
    const cancelDelete = () => setIsDeleteCandidate(false);
    const dispatch = useDispatch();
    const acceptDelete = useCallback(async () => {
        setIsDeleteCandidate(false);
        dispatch(deleteChat(chat._id));
        dispatch(push(routesPaths.MESSENGER));
    }, [chat]);

    return (
        <>
            <Dialog
                open={isDeleteCandidate}
                onClose={cancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Внимание"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Вы уверены, что хотите удалить чат ${chat.title}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={acceptDelete} color="primary" autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
