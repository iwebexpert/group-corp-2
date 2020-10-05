import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default class Header extends React.Component {
  static propTypes = {
    chatId: PropTypes.number,
  };

  static defaultProps = {
    chatId: 1,
  };

  render() {
    return (
      <div className="header">
        <span style={{ fontSize: "20px" }}>{this.props.chatId}</span>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to={`/profile`}
            >
              <AccountCircle />
            </IconButton>
            <Typography variant="h6" component={Link} to={`/`}>
              Messenger App
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
