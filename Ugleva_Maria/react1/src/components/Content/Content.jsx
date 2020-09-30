import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MessageField from '../MessageField';
import MessagesList from '../MessagesList';
import ChatsList from '../ChatsList';
import './Content.scss';


class Content extends Component{
  state = {
    messages: [],
  };
  componentDidUpdate = () => {
    if (this.state.messages.length % 2 === 1) {
      setTimeout(
        () =>
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: `${
                  this.state.messages[this.state.messages.length - 1].author
                }, может попьем кофе `,
                author: "Бот",
              },
            ],
          }),
        1000
      );
    }
  };
  handleSend = (message) => {
    this.setState({ messages: this.state.messages.concat(message) });
    console.log(this.state.messages);
  };
render() {
    return (
        <div className='content'>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper><ChatsList /></Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper>
                <MessagesList messages={this.state.messages} />
                <MessageField onSend={this.handleSend} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    }
}
export default Content;
