import {combineReducers} from 'redux'

import {chatsReducer} from "./chats"
import {settingsReducer} from "./settings"
import {profileReducer} from "./profile"

export const rootReducer = combineReducers({
    chats: chatsReducer,
    profile: profileReducer,
    settings: settingsReducer
})
