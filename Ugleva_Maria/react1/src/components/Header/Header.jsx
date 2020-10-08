import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import  profileLoadAction  from "../../actions/profileAction";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  profileLink: {
    flexDirection: "row",
    display: "flex",
  },
  profileUser: {
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    marginLeft: "5px",
    color: "white",
  },
  chatListHeader: {
    color: "white",
  },
}));

function Header(props) {
  const classes = useStyles();

  useEffect(() => {
    props.profileLoadAction();
  }, []);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              <Button className={classes.chatListHeader}>Список чатов</Button>
            </Link>
          </Typography>
          <Link className={classes.profileLink} to="/profile">
            <Avatar alt="Remy Sharp" src="./img/ivan.jpg" />
            <span className={classes.profileUser} color="inherit">
              {props.profile.entries.name}
            </span>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log('new', state)
  return {
    profile: state.profile
  }
}
const mapDispatchToPTops = (dispatch) => {
  return {
    profileLoadAction: () => dispatch(profileLoadAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToPTops)(Header);
