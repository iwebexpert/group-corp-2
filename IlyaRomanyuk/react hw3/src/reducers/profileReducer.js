import { PERSON_LOAD_REQUEST, PERSON_LOAD_SUCCESS, PERSON_LOAD_FAILURE } from "../actions/personAC";

const initialState = { person: {}, loading: false, error: false, };

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case PERSON_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case PERSON_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                person: action.payload,
            };

        case PERSON_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default: return state
    }
}