import React from "react";
import { Link } from "react-router-dom";

import "./Pages.scss";

export function About() {
  return (
    <div className="about">
      <h1>О нас</h1>
      <p>Вы попали на страницу реактивного чата.</p>
      <Link to="/" className="back">
        Назад
      </Link>
    </div>
  );
};
