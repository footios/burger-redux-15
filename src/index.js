import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { burgerBuilderReducer } from './store/reducers/burgerBuilderReducer';
import { orderReducer } from './store/reducers/orderReducer'
import { fetchOrdersReducer } from './store/reducers/fetchOrdersReducer'
import { authReducer } from './store/reducers/authReducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	fetchOrders: fetchOrdersReducer,
	auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

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
