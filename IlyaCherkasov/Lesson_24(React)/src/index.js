import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../public/index.scss';

import Routing from './helpers/Routing';
import initStore from './redux/store';

ReactDom.render(
  <Provider store={initStore()}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </Provider>,
  document.querySelector('.root')
);
