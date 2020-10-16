import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import {
  Paper,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  contact: {
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#e5e5ea",
    marginLeft: "10px",
    marginRight: "10px",
  },
});

export const Contact = ({ name, online }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.contact}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={online} />
      </ListItem>
    </Paper>
  );
};
