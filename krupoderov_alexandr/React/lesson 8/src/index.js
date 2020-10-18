import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/store';
import { persistor } from './store/store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './components/App/App';

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</PersistGate>
	</Provider>
, document.getElementById('root'));