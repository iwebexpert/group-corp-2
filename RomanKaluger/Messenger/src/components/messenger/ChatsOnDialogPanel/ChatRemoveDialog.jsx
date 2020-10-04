import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import React, {useCallback} from "react";
import {DbWorker} from "../../../utils/DbWorker";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {useHistory} from 'react-router-dom';
import routesPaths from "../../../configs/routesPaths";

export default function ({isDeleteCandidate, setIsDeleteCandidate, selectedChat, chat}) {
    const history = useHistory();
    const cancelDelete = () => setIsDeleteCandidate(false);
    const acceptDelete = useCallback(() => {
        DbWorker.deleteChat(chat._id);
        setIsDeleteCandidate(false);
        history.push(routesPaths.MESSENGER);
    },[selectedChat, chat]);

    return(
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
    );
}
