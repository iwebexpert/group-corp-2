import React, {Component} from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import botImg from "../../../../../img/user.png";

export class DialogNameMU extends Component{
    image = {background: 'url(' + this.props.image + ') top/cover no-repeat'};

    render() {
        return (
            <ListItem className="dialog_link" alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="avatar" src={botImg} variant='rounded'/>
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.name}
                    secondary={
                        <React.Fragment>
                            {this.props.lastMessage}
                        </React.Fragment>
                    }
                />
            </ListItem>
        );
    }
}