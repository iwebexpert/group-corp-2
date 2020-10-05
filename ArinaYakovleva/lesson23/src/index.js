import React from 'react';
import ReactDom from 'react-dom';
// import {Messenger} from './components/Messenger';
import { BrowserRouter,HashRouter, MemoryRouter } from "react-router-dom";
import {App} from './components/App';

ReactDom.render(<BrowserRouter>
                    <App />
                </BrowserRouter>,
            document.getElementById('root'));