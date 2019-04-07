import { put } from 'redux-saga/effects';

import axios from '../../axios-orders'

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
	yield put(actions.purchaseBurgerStart());
	const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
	try {
		yield put(actions.purchaseBurgerSuccess(response.data, action.orderData));
	} catch (error) {
		yield put(actions.purchaseBurgerFail(error));
	}
}
