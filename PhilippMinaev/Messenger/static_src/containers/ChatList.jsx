import React from "react";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { addChat } from "../actions/chatActions";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

class ChatList extends React.Component {
  static propTypes = {
    chats: PropTypes.object.isRequired,
    addChat: PropTypes.func.isRequired,
  };
  state = {
    input: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Enter
      this.handleAddChat();
    }
  };

  handleAddChat = () => {
    if (this.state.input.length > 0) {
      this.props.addChat(this.state.input);
      this.setState({ input: "" });
    }
  };

  render() {
    const { chats } = this.props;
    const chatElements = Object.keys(chats).map((chatId) => (
      <ListItem button component={Link} key={chatId} to={`/chat/${chatId}`}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary={chats[chatId].title} />
      </ListItem>
    ));

    return (
      <List>
        {chatElements}
        <Divider />
        <ListItem
          key="Add new chat"
          onClick={this.handleAddChat}
          children={
            <Grid container spacing={1} wrap="nowrap" alignItems="flex-end">
              <Grid item>
                <AddIcon />
              </Grid>
              <Grid item>
                <TextField
                  key="textField"
                  fullWidth
                  label="Добавить чат"
                  name="input"
                  onChange={this.handleChange}
                  value={this.state.input}
                  onKeyUp={this.handleKeyUp}
                />
              </Grid>
            </Grid>
          }
        />
      </List>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chats,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addChat }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
