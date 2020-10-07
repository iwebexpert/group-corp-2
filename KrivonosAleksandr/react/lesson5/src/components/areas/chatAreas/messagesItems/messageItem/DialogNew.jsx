import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../../../assets/lottie/e-mail.json"


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const DialogsNew = (props) => {
    return <div className="dialogs_new">
        <div className="dialogs_new__content">
            <Lottie options={defaultOptions}
                    height={300}
                    width={300}
            />
            <div className="dialogs_new__text">Выберите диалог слева<br/>Тут будут отображаться Ваши сообщения<br/>Или создайте новый диалог</div>
        </div>
    </div>;
}

export default DialogsNew;