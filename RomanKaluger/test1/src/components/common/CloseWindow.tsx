import React from "react";

type propTypes = {
    actionClose: () => void
}
export const CloseWindow: React.FC<propTypes> = ({actionClose}) => {
    return (
        <img
            onClick={actionClose}
            className={'DeleteSign'}
            alt={'DeleteSign'}
            src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
    );
};
