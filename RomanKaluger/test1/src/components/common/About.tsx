import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import {setAboutPageOpen} from "../../redux/actions";
import './About.scss';
import {ICombinedState, ISystemState} from "../../redux/rdx";
import {Dispatch} from "redux";

export const About: React.FC = () => {
    const {aboutPageOpen}: {aboutPageOpen: boolean} = useSelector<ICombinedState, ISystemState>(s => s.system);
    const dispatch: Dispatch = useDispatch();
    const CancelHandler = (): void => {
        dispatch(setAboutPageOpen(false));
    };
    return(
        <Backdrop open={aboutPageOpen}>
            <div className={'AboutContainer'}>
                <div className={'primaryHeader'}>О программе</div>
                <span className={'secondaryHeader'}>Мессенджер Калугера Романа (MasterKufa)</span>
                <span className={'infoText'}>Основные возможности:</span>
                <ul>
                    <li>Полноценный многопользовательский мессенджер</li>
                    <li>Регистрация пользователей(С валидацией)</li>
                    <li>Авторизация пользователей</li>
                    <li>Редирект без авторизации</li>
                    <li>Отправка сообщений любому пользователю</li>
                    <li>Система друзей/подписчиков/подписок</li>
                    <li>Прочитанные/непрочитанные сообщения (на панели чатов и в самих сообщения)</li>
                    <li>Отображение последнего сообщения с автором на карточке чата</li>
                    <li>Список чатов</li>
                    <li>Список Контактов</li>
                    <li>Поиск по чатам и контактам</li>
                    <li>Удаления сообщения или группы сообщений</li>
                    <li>Пересылка сообщения или группы сообщений с соблюдением вложенности</li>
                    <li>Удаление чата</li>
                    <li>Создание чата с произвольным пользователем(если чат существовал и был удален, то будет восстановлен)</li>
                    <li>Голосовые сообщения</li>
                    <li>Вложение картинок с компьютера, а также по CTRL+C</li>
                    <li>Рисование рукописных посланий с конвертацией в картинку и отправкой</li>
                    <li>Смайлики</li>
                    <li>Экраны загрузки при запросах на сервер</li>
                    <li>Просмотр информации о пользователе(клик на его карточке или автарке в любом месте)</li>
                    <li>Изменение информации о своем профиле(в т ч установка Аватарки)</li>
                    <li>Меню (слева снизу)</li>
                    <li>Сервер с использованием Mongo+Express+Websocket</li>
                    <li>Информация в шапке чата о его участниках</li>
                    <li>Пользователь Петя - бот</li>
                    <li>Многопользовательские беседы с возможностью приглашения, исключения, редактирования инф. о беседе, уведомлениями в чат</li>
                </ul>
                <img onClick={CancelHandler} className={'DeleteSign'} alt={'DeleteSign'}
                     src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
            </div>
        </Backdrop>
    );
};
