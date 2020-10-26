const initialState = {
    isDrawerOpen: true,
    darkTheme: false
}

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DRAWER':
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen,
            }
        case 'SET_THEME':
            if (!state.darkTheme) {
                document.documentElement.setAttribute("theme", "dark")
            } else {
                document.documentElement.setAttribute("theme", "white")
            }
            return {
                ...state,
                darkTheme: !state.darkTheme,
            }
        default:
            return state
    }
}
