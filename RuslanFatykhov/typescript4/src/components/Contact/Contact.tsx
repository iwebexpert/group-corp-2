import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import {
  Paper,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Theme,
  useTheme,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  contact: {
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#e5e5ea",
    marginLeft: "10px",
    marginRight: "10px",
  },
}));

export const Contact: React.FC<ContactType> = ({ name, online }) => {
  const theme = useTheme<Theme>();
  const classes = useStyles(theme);

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
