import React from 'react';
import ReactDom from 'react-dom';
import {Layout} from 'components/Layout';
import {BrowserRouter, HashRouter, MemoryRouter} from 'react-router-dom';

ReactDom.render(
  <>
    {/* <AudioMessage/> */}
    {/* <Layout/> */}
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  </>
  , document.getElementById('root'));