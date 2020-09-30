import React from "react";
import MessengerTopPanel from "./MessengerTopPanel";
import MessagesArea from "./MessagesArea/MessagesArea";
import InputMessageArea from "./InputMessageArea";
import useAuthCheck from "../../utils/useAuthCheck";
import {useSelector} from "react-redux";

export default () => {
    useAuthCheck();
    const curChat = useSelector(s => s.app.selectedChat);
    return (
        <div className={'MessengerArea'}>
          <MessengerTopPanel chat={curChat}/>
            {
                curChat
                    ?   <>
                            <MessagesArea curChat={curChat}/>
                            <InputMessageArea/>
                        </>
                    :   <div className="emptyMessengerArea">Сперва Выберите чат на панели слева</div>
            }
        </div>
    );
}
