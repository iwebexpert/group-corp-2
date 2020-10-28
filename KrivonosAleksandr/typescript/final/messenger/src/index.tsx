import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {initStore, history} from "./store.js";
import './scss/style.scss';
import Layout from "./components/Layout";

const {store, persistor} = initStore();

ReactDom.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
                <Layout/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));





















// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
