import {ActionCreator} from "redux"

export type setDrawer = {
    type: String
}

export type setDarkTheme = {
    type: String
}

export type SettingsActions = setDarkTheme | setDrawer

export const setDrawer: ActionCreator<setDrawer> = () => ({
    type: 'SET_DRAWER'
})

export const setDarkTheme: ActionCreator<setDarkTheme> = () => ({
    type: 'SET_THEME',
})
