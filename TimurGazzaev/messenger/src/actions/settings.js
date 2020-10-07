export const SET_DRAWER = 'SET_DRAWER'
export const SET_DARK_THEME = 'SET_DARK_THEME'

export const setDrawer = () => ({
    type: SET_DRAWER
})

export const setDarkTheme = (theme) => ({
    type: SET_DARK_THEME,
    payload: theme
})
