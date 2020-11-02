import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { PageType } from "./Home";

export const Error: React.FC<PageType> = ({ classhomepage }) => {
  return (
    <Link to="/" className={classhomepage}>
      <HomeIcon fontSize="large"></HomeIcon>
      <h2>Page not found!</h2>
      <h4>To home page...</h4>
    </Link>
  );
};
