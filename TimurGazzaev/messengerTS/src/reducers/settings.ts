import {Reducer} from 'redux'

import {SettingsActions} from '../actions/settings'

export type SettingsReducerState = {
    isDrawerOpen: boolean,
    darkTheme: boolean
}

const initialState: SettingsReducerState = {
    isDrawerOpen: true,
    darkTheme: false
}

export const settingsReducer: Reducer<SettingsReducerState, SettingsActions> = (state = initialState, action: any) => {
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
