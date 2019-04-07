import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { burgerBuilderReducer } from './store/reducers/burgerBuilderReducer';
import { orderReducer } from './store/reducers/orderReducer';
import { fetchOrdersReducer } from './store/reducers/fetchOrdersReducer';
import { authReducer } from './store/reducers/authReducer';
import { watchAuth, watchBurgerBuilder, watchOrder, fetchOrders } from './store/sagas';

const sagaMiddleware = createSagaMiddleware();

let devtools =
	process.env.NODE_ENV === 'development'
		? composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
		: applyMiddleware(thunk, sagaMiddleware);

// const composeEnhancers = process.env.NODE_ENV === 'development' ?
//  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	fetchOrders: fetchOrdersReducer,
	auth: authReducer
});

const store = createStore(rootReducer, devtools);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);
sagaMiddleware.run(fetchOrders);

// Note curly braces didn't work!
const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
