import React from "react";
import { Link } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";

export const Error = (props) => {
  return (
    <Link to="/" className={props.class}>
      <HomeIcon fontSize="large"></HomeIcon>
      <h2>Page not found!</h2>
      <h4>To home page...</h4>
    </Link>
  );
};
