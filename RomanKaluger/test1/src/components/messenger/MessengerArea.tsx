import React, {useState} from "react";
import MessengerTopPanel from "./MessengerTopPanel";
import MessagesArea from "./MessagesArea/MessagesArea";
import InputMessageArea from "./InputMessageArea/InputMessageArea";
import useAuthCheck from "../../utils/useAuthCheck";
import {useSelector} from "react-redux";
import {Switch, Route} from 'react-router-dom';
import routesPaths from "../../configs/routesPaths";
import {PAGE_CURRENT} from "../../configs/statuses";
import {Redirect} from "react-router-dom"
import {ImageCarousel} from "./ImageCarousel";
import {IChat, IMessage} from "../../types/globalTypes";
import {IAppState, ICombinedState} from "../../redux/reduxTypes/rdx";

const MessengerArea: React.FC = () => {
    useAuthCheck(PAGE_CURRENT);
    const [pendingMessages, setPendingMessages] = useState<IMessage[]>([]);
    const {selectedChat, chats} = useSelector<ICombinedState, IAppState>(s => s.app);
    return (
        <div className={'MessengerArea'}>
            <ImageCarousel/>
            <MessengerTopPanel chat={chats.find((x: IChat): boolean => x._id === selectedChat) ?? null}/>
            <Switch>
                <Route path={routesPaths.CHAT}>
                    {
                        selectedChat
                            ? <>
                                <MessagesArea pendingMessages={pendingMessages} setPendingMessages={setPendingMessages}/>
                                <InputMessageArea pendingMessages={pendingMessages}
                                                  setPendingMessages={setPendingMessages}/>
                            </>
                            : <div className="emptyMessengerArea">Сперва Выберите чат на панели слева</div>
                    }

                </Route>
                <Route path={routesPaths.MESSENGER} exact>
                    <div className="emptyMessengerArea">Сперва Выберите чат на панели слева</div>
                </Route>
                <Redirect to={routesPaths.MESSENGER}/>
            </Switch>
        </div>
    );
};
export default MessengerArea;
