const initialState = {
    profiles: [],
    loading: true,
    error: false
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROFILES_LOAD_REQUEST':
            return {
                ...state,
                loading: true,
                error: false,
            }

        case 'PROFILES_LOAD_SUCCESS':
            return {
                ...state,
                loading: false,
                profiles: action.payload,
            }

        case 'PROFILES_LOAD_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
            }

        default:
            return state;
    }
}
