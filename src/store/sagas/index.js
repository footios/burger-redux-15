import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initBurgerIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga } from './order';
import { fetchOrdersSaga } from './fetchOrders'

// takeEvery listents to certain action and does smth when they occur
export function* watchAuth() {
	yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
	yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
	yield takeEvery(actionTypes.INIT_BURGER_INGREDIENTS, initBurgerIngredientsSaga);
}

export function* watchOrder() {
	/* `takeLatest`:
	Spawns a saga on each action dispatched to the Store that matches pattern. 
	And automatically cancels any previous saga task started previously if it's still running.
	Since `takeLatest` cancels any pending task started previously, 
	we ensure that if a user triggers multiple consecutive PURCHASE_BURGER actions rapidly, 
	we'll only conclude with the latest action */
	yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}

export function* fetchOrders() {
	yield takeEvery(actionTypes.FETCH_ORDERS_SAGA, fetchOrdersSaga);
}