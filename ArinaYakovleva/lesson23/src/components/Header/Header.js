import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import {Link} from 'react-router-dom';

const useStyles = {
    root: {
      flexGrow: 1,
      width: '100%'
    },
    title: {
      flexGrow: 1,
    },
    profile: {
      flexGrow: 2,
      color: 'white',
      textDecoration: 'none',
    }
  };

class HeaderClass extends Component{
    render(){
    const {classes} = this.props;
    return(
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>           
                <ForumRoundedIcon fontSize="large" />
            <Typography variant="h4" className={classes.title}>
                Messenger
            </Typography>
            <Typography variant="h6" className={classes.profile}>
               <Link to="/profile" >Profile</Link>
            </Typography>
            </Toolbar>
        </AppBar>

        </div>
    );
 }
}

export const Header = withStyles(useStyles)(HeaderClass);