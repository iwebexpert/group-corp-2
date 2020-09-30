import React, {useCallback, useEffect, useState} from 'react';
import {setCurrentUser} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import routesPaths from "../../../configs/routesPaths";
import RadialMenu from "react-radial-menu";

const items = [
    {"href": "#unauth", "image": "url(https://img.icons8.com/color/100/000000/shutdown--v1.png)"},
  ];

const center = {
    "image":"url(https://img.icons8.com/color/48/000000/xbox-menu--v1.png)"
};

export default function () {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const curUser = useSelector(s => s.app.curUser);
    const history = useHistory();
    const unAuthorize = useCallback(() => {
        dispatch(setCurrentUser(null));
        history.push(routesPaths.AUTH);
    });
    useEffect(() => {
        //вынужденный императивный подход, так как готовый компонент RadialMenu не поддерживает добавление обработчиков через пропсы
        const unAuthSelector = document.querySelector(`a[href="#unauth"]`);
        unAuthSelector.addEventListener('click', unAuthorize);
        return () => unAuthSelector.removeEventListener('click', unAuthorize);
    },[]);
    useEffect(()=>{
        //вынужденный императивный подход, так как готовый компонент RadialMenu не поддерживает добавление обработчиков через пропсы
        const x = document.querySelector('.ShortMenuContainer .radial-menu-button');
        const f = () => setIsOpen(!isOpen);
        x.addEventListener('click', f);
        return () => x.removeEventListener('click', f);
    }, [isOpen]);
    return(
        <div className={'ShortMenuContainer'}>
            {
                !isOpen
                ?  <div className={'shortMenuGreeting'}> {`Привет, ${curUser.name}`}</div>
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
}
