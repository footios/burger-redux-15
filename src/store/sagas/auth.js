import { delay } from 'redux-saga/effects'
import { put } from 'redux-saga/effects';


import * as actions from '../actions'

// This is generator. It can be executed sequentially.
// yiels means that this step should be executed and wait 
// for it to finish.
// We need to hook up this function to the store.
export function* logoutSaga(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
	yield localStorage.removeItem('email');
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.authLogout())
	
}