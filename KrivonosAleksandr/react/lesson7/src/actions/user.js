import {createAction} from 'redux-api-middleware';

export const USER_INFO_LOAD_REQUEST = 'CHATS_LOAD_REQUEST';
export const USER_INFO_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS';
export const USER_INFO_LOAD_FAILURE = 'CHATS_LOAD_FAILURE';

export const userInfoLoadRequestAction = () => ({
    type: USER_INFO_LOAD_REQUEST,
})

export const userInfoLoadSuccessAction = (data) => ({
    type: USER_INFO_LOAD_SUCCESS,
    payload: data,
})

export const userInfoLoadFailureAction = (error) => ({
    type: USER_INFO_LOAD_FAILURE,
    payload: error,
})

//fetch
export const userInfoLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(userInfoLoadRequestAction());
            const result = await fetch('/api/profile/0');
            dispatch(userInfoLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(userInfoLoadFailureAction(error));
        }
    }
};

// //Middleware API
// export const userInfoLoadAction = () => createAction({
//     endpoint: '/api/profile/0',
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     types: [
//         USER_INFO_LOAD_REQUEST,
//         USER_INFO_LOAD_SUCCESS,
//         USER_INFO_LOAD_FAILURE,
//     ],
// });
