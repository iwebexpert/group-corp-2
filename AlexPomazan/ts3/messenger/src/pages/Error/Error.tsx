import React from "react";
import { Header } from "../../components/Header";
import "./Error.css";

export const Error : React.FC<{}> = () => (
    <>
      <Header />
      <div className="error-content">
        <h1>Error 404</h1>
        <p>Page not found.</p>
      </div>
    </>
  );
