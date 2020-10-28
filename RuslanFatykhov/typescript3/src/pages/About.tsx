import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  about: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
  },
  back: {
    backgroundColor: "#3498db",
    padding: "10px 20px",
    textDecoration: "none",
    color: "white",
    borderRadius: "15px",
    marginTop: "50px",
  },
});

export const About: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.about}>
      <h1>О нас</h1>
      <p>Вы попали на страницу реактивного чата.</p>
      <Link to="/" className={classes.back}>
        Назад
      </Link>
    </div>
  );
};
