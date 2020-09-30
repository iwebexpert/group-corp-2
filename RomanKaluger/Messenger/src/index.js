import React from "react";
import ReactDom from "react-dom";
import App from './components/common/App'
import "./../scss/root.scss"
import {Provider} from "react-redux";
import {store} from "./redux/StorageRedux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDom.render(
        <MuiThemeProvider>
            <Provider store={store}>
                 <App/>
             </Provider>
        </MuiThemeProvider>
        ,
        document.querySelector('.root'));
