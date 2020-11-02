import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../../redux/actions";
import {Dispatch} from "redux";
import {ICombinedState, ISystemState} from "../../redux/reduxTypes/rdx";

export const Error: React.FC = () => {
    const dispatch: Dispatch = useDispatch();
    const {error} = useSelector<ICombinedState, ISystemState>(s => s.system);
    return (
        <>
            {
                error ?
                    <Backdrop open={!!error}>
                        <div className={'AboutContainer'}>
                            <div className={'primaryHeader'}>Ошибка</div>
                            <span className={'secondaryHeader'}>{error.message}</span>
                            <div onClick={(): void => {
                                dispatch(setError(null))
                            }} className="button">Ок
                            </div>
                            <img onClick={(): void => {
                                dispatch(setError(null))
                            }} className={'DeleteSign'} alt={'DeleteSign'}
                                 src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                        </div>
                    </Backdrop>
                    : null
            }
        </>
    );
};
