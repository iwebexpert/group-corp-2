import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';

const useStyles = {
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
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

            </Toolbar>
        </AppBar>

        </div>
    );
 }
}

export const Header = withStyles(useStyles)(HeaderClass);