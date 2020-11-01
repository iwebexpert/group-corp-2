import { PersonActions, ProfileActionTypes } from "../actions/personAC";
import { Reducer } from 'redux'

export type PersonReducerState = {
    person: Person,
    loading: boolean;
    error: boolean;
}

const initialState: PersonReducerState = {
    person: {
        name: '',
        status: '',
        image: ''
    },
    loading: false,
    error: false
};

export const profileReducer: Reducer<PersonReducerState, PersonActions> = (state = initialState, action) => {
    switch (action.type) {

        case ProfileActionTypes.PERSON_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case ProfileActionTypes.PERSON_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                person: action.payload,
            };

        case ProfileActionTypes.PERSON_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default: return state
    }
}