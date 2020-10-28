import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/common/App'
import "./scss/root.scss"
import {Provider} from "react-redux";
import { persistor, store} from "./redux/StorageRedux";

import {PersistGate} from 'redux-persist/integration/react';

ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    ,
    document.getElementById('root'));
