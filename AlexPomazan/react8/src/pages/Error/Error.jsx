import React from "react";
import { Header } from "../../components/Header";
import "./Error.css";

export function Error() {
  return (
    <>
      <Header />
      <div className="error-content">
        <h1>Error 404</h1>
        <p>Page not found.</p>
      </div>
    </>
  );
}
