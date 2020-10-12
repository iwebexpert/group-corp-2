import React, { Component } from "react";
import { Avatar, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

import "./Header.css";

const styles = {
  root: {
    backgroundColor: deepOrange[500],
  },
  large: {
    width: "7px",
    height: "7px",
  },
};

class HeaderClass extends Component {
  handleRedirect = () => {
    this.props.push("/");
  };

  render() {
    const { infoProfile, classes } = this.props;
    return infoProfile ? (
      <div className="header">
        <div
          button="true"
          onClick={this.handleRedirect}
          style={{ cursor: "pointer", fontFamily: "Courier Prime" }}
          className="header-logo"
        >
          Messenger App
        </div>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <div className="header-avatar">
            <Avatar className={classes.root} src={infoProfile.avatar} />
            {infoProfile.name}
          </div>
        </Link>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export const Header = withStyles(styles)(HeaderClass);
