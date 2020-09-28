import React from "react";

export default ({chat}) => {
    return (
        <div className={'MessengerTopPanel'}>
            <div className={'chatTitleTopPn'}>
                {
                    chat ? `Собеседник: ${chat.title}` : 'Чат не выбран'
                }
            </div>
        </div>
    );
}
