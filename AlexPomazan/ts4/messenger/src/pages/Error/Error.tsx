import React from "react";
import { HeaderContainer } from "../../containers/HeaderContainer";
import "./Error.css";

export const Error: React.FC<{}> = () => (
  <>
    <HeaderContainer />
    <div className="error-content">
      <h1>Error 404</h1>
      <p>Page not found.</p>
    </div>
  </>
);
