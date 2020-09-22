import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './mini-store/store';

const rerenderTree = () => {
	ReactDOM.render(
		<App messages={store.getState().messages} dispatch={store.dispatch.bind(store)}/>
		,document.getElementById('root'));
}

rerenderTree()

store.subscribe(
	() => {rerenderTree(store.getState())}
)


