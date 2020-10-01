import React from "react";
import EcoIcon from "@material-ui/icons/Eco";

import "../../src/App.scss";

export const Header = (props) => {
  return (
    <div className="header">
      <h1>
        Telegraf
        <EcoIcon fontSize="large" />
      </h1>
    </div>
  );
};
