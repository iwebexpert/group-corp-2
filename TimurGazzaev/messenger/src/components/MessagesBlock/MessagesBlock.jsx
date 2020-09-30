import React, {Component} from 'react'
import {MessagesList} from './MessagesList'
import {MessageForm} from './MessageForm'
import {Grid, Divider} from "@material-ui/core"
import clsx from "clsx"

export class MessagesBlock extends Component {
    state = {
        messages: [{author: 'Тимур', text: 'Хорошо, пока', time: '12:47'}, {author: 'Бот', text: 'До скорой встречи, Тимур', time: '12:48'}],
        isFetching: false
    }

    handleMessageSend = (message) => {
        this.setState({messages: this.state.messages.concat([message])})
    }



    componentDidUpdate(prevProps, prevState) {
        let messages = this.state.messages

        if (messages !== prevState.messages) {
            if (messages[messages.length - 1]['author'] === 'Бот' || this.state.isFetching) {
                return
            }
            this.setState({isFetching: true})
            setTimeout(() => {
                this.handleMessageSend({author: 'Бот', text: `Привет, ${messages[messages.length - 1].author}`, time: this.getTime()})
                this.setState({isFetching: false})
            }, 500)
        }
    }

    render() {
        const {messages} = this.state

        return (
            <Grid className={clsx(this.props.classes.content, {[this.props.classes.contentShift]: this.props.open})}>
                <Grid item xs={4} className={this.props.classes.messages} >
                    <MessagesList items={messages}/>
                </Grid>
                <Divider/>
                <Grid item xs={8} className={this.props.classes.form}>
                    <MessageForm classes={this.props.classes} onSend={this.handleMessageSend}/>
                </Grid>
            </Grid>

        )
    }
}
