import { LOAD_PERSON } from "../actions/personAC";
import { personData } from "../helpers/personData";

const initialState = { person: {} };

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PERSON:
            return { ...state, person: personData }
        default: return state
    }
}