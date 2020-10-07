import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {nanoid} from 'nanoid'
import {getMessages, sendMessage} from '../../actions/chats'
import {MessagesBlock} from "./MessagesBlock"

const MessagesBlockContainer = ({chatId, messages, getMessages, sendMessage, isDrawerOpen}) =>  {

    useEffect(() => {
        getMessages()
    }, [])

    const addMessage = (message) => {
        message.id = nanoid()
        sendMessage({...message, chatId})
    }

    return <MessagesBlock messages={messages} addMessage={addMessage} open={isDrawerOpen} chatId={chatId}/>
}

function mapStateToProps(state, ownProps){
    const chats = state.chats.entries
    const {match} = ownProps

    let messages = null

    if(match && chats[match.params.id]){
        messages = chats[match.params.id].messages
    }

    return {
        messages,
        chatId: match ? match.params.id: null,
        isDrawerOpen: state.settings.isDrawerOpen
    }
}

export default connect(mapStateToProps, {getMessages, sendMessage})(MessagesBlockContainer)
