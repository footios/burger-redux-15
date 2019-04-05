import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

// This is generator. It can be executed sequentially.
// yiels means that this step should be executed and wait 
// for it to finish.
// We need to hook up this function to the store.
export function* logoutSaga(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
	yield localStorage.removeItem('email');
	yield put({
		type: actionTypes.AUTH_LOGOUT
	});
}
