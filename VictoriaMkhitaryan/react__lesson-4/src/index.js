import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

import Root from './containers/Root/Root';

ReactDom.render(
      <Router>
            <Root />
      </Router>
, document.getElementById('root'));