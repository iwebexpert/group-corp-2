import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../public/index.css';

import Routing from './helpers/Routing';

ReactDom.render(
  <BrowserRouter>
    <MuiThemeProvider>
      <Routing />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.querySelector('.root')
);
