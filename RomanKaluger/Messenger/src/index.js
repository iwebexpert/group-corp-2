import React from "react";
import ReactDom from "react-dom";
import App from './components/common/App'
import "./../scss/root.scss"
import {Provider} from "react-redux";
import { persistor, store} from "./redux/StorageRedux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {PersistGate} from 'redux-persist/integration/react';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
ReactDom.render(
        <MuiThemeProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                        <App/>
                </PersistGate>
             </Provider>
        </MuiThemeProvider>
        ,
        document.querySelector('.root'));

