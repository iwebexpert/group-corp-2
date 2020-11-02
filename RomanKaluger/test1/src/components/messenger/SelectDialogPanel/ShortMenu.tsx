import React, {useCallback, useEffect, useState} from 'react';
import {openUserProfile, setAboutPageOpen, setCurrentUser} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router';
import routesPaths from "../../../configs/routesPaths";
import RadialMenu, {IMenuItem} from "react-radial-menu";
import {Dispatch} from "redux";
import {IAppState, ICombinedState} from "../../../redux/reduxTypes/rdx";

const items: IMenuItem[] = [
    {"href": "#unauth", "image": "url(https://img.icons8.com/color/100/000000/shutdown--v1.png)"},
    {"href": "#myProfile", "image": "url(https://img.icons8.com/color/100/000000/user-male.png)"},
    {"href": "#about", "image": "url(https://img.icons8.com/color/100/000000/help--v1.png)"},
];

const center: Omit<IMenuItem, 'href'> = {
    "image": "url(https://img.icons8.com/color/48/000000/xbox-menu--v1.png)"
};

const ShortMenu: React.FC = () => {
    const dispatch: Dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {curUser} = useSelector<ICombinedState, IAppState>(s => s.app);
    const unAuthorize = useCallback((e: MouseEvent): void => {
        e.preventDefault();
        dispatch(setCurrentUser(null));
        dispatch(push(routesPaths.AUTH));
    }, []);
    useEffect((): () => void => {
        //вынужденный императивный подход, так как готовый компонент RadialMenu не поддерживает добавление обработчиков через пропсы
        const unAuthSelector: HTMLDivElement | null = document.querySelector(`a[href="#unauth"]`);
        const myProfileSelector: HTMLDivElement | null = document.querySelector(`a[href="#myProfile"]`);
        const aboutSelector: HTMLDivElement | null = document.querySelector(`a[href="#about"]`);

        const showMyProfile = (e: MouseEvent): void => {
            e.preventDefault();
            setTimeout((): void => {
                dispatch(openUserProfile(curUser))
            }, 0);
        };
        const showAbout = (e: MouseEvent): void => {
            e.preventDefault();
            dispatch(setAboutPageOpen(true));
        };

        if (unAuthSelector) unAuthSelector.addEventListener('click', unAuthorize);
        if (myProfileSelector) myProfileSelector.addEventListener('click', showMyProfile);
        if (aboutSelector) aboutSelector.addEventListener('click', showAbout);

        return (): void => {
            if (unAuthSelector) unAuthSelector.removeEventListener('click', unAuthorize);
            if (myProfileSelector) myProfileSelector.removeEventListener('click', showMyProfile);
            if (aboutSelector) aboutSelector.removeEventListener('click', showAbout);
        };
    }, [curUser]);
    useEffect((): () => void => {
        //вынужденный императивный подход, так как готовый компонент RadialMenu не поддерживает добавление обработчиков через пропсы
        const x: HTMLDivElement | null = document.querySelector('.ShortMenuContainer .radial-menu-button');
        const f = (): void => setIsOpen(!isOpen);
        if (x) x.addEventListener('click', f);
        return (): void => {
            if (x) x.removeEventListener('click', f)
        };
    }, [isOpen]);
    return (
        <div className={'ShortMenuContainer'}>
            {
                !isOpen
                    ? <div className={'shortMenuGreeting'}> {`Привет, ${curUser ? curUser.name : 'Незнакомец'}`}</div>
                    : null
            }
            <RadialMenu
                items={items}
                center={center}
                itemsSize={50}
                distance={10}
            />
        </div>
    );
};
export default ShortMenu;
