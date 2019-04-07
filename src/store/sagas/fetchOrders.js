import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';

import * as actions from '../actions'

export function* fetchOrdersSaga(action) {
	yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' 
    + action.userId + '"';
	const response = yield axios.get('/orders.json' + queryParams);
	try {
		//convert the object into an array:
		const fetchedOrders = [];
		for (const key in response.data) {
			if (response.data.hasOwnProperty(key)) {
			 yield	fetchedOrders.push({ ...response.data[key], id: key });
			}
		}
		yield put(actions.fetchOrdersSuccess(fetchedOrders));
	} catch (error) {
		yield put(actions.fetchOrdersFail());
	}
}
