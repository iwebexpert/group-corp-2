import React from "react";
import ReactDom from "react-dom";
import App from './components/common/App'
import "./../scss/root.scss"
import {Provider} from "react-redux";
import {store} from "./redux/StorageRedux";

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('.root'));
