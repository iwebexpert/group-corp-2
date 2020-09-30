import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../public/index.css';

import Layout from './components/Layout';

ReactDom.render(
  <MuiThemeProvider>
    <Layout />
  </MuiThemeProvider>,
  document.querySelector('.root')
);
