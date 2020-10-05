import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './scss/style.scss';

import Layout from "./components/Layout";

ReactDom.render(<BrowserRouter><Layout /></BrowserRouter>, document.getElementById('root'));