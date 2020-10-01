import React from "react";
import './Layout.scss';
import Header from '../Header';
import Content from '../Content';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Content />
    </div>
  );
};
export default Layout;
