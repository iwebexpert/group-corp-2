import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'

import {chatsReducer} from "./chats"
import {settingsReducer} from "./settings"
import {profileReducer} from "./profile"

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    chats: chatsReducer,
    profile: profileReducer,
    settings: settingsReducer
})
