import React, {Component} from 'react'
import {MessagesList} from './MessagesList'
import {MessageForm} from './MessageForm'
import {Grid, Divider} from "@material-ui/core"
import clsx from "clsx"

export class MessagesBlock extends Component {
    state = {
        isFetching: false
    }

    getTime = () => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`
    }

    sendMessage = (author, message, time) => {
        let currentChat = this.props.match.params.id
        let messages = this.props.chats[currentChat].messages

        this.props.addMessage(currentChat, author, message, time)

        if (messages[messages.length - 1]['author'] === 'Бот' || this.state.isFetching) {
            return
        }
        this.setState({isFetching: true})
        setTimeout(() => {
            this.props.addMessage(currentChat, 'Бот',
                `Привет, ${messages[messages.length - 1].author}`, this.getTime())
            this.setState({isFetching: false})
        }, 1000)
    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid
                    className={clsx(this.props.classes.content, {[this.props.classes.contentShift]: this.props.open})}>
                    <Grid item xs={4} className={this.props.classes.messages}>
                        <MessagesList items={this.props.chats[this.props.match.params.id].messages}/>
                    </Grid>
                    <Divider/>
                    <Grid item xs={8} className={this.props.classes.form}>
                        <MessageForm classes={this.props.classes} getTime={this.getTime} onSend={this.sendMessage}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
