import {
    SET_DRAWER, SET_DARK_THEME,
} from '../actions/settings'

const initialState = {
    isDrawerOpen: true,
    darkTheme: false
}

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRAWER:
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen,
            }
        case SET_DARK_THEME:
            if (action.payload) {
                document.documentElement.setAttribute("theme", "dark")
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.setAttribute("theme", "white")
                localStorage.setItem('theme', 'white')
            }
            return {
                ...state,
                darkTheme: action.payload,
            }
        default:
            return state
    }
}
