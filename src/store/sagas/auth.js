import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

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
	yield put(actions.authLogout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	let URL =
		'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDutyh3MQSQI_Du4FRSvPU7XAYwVTOBVfQ';
	if (!action.isSignup) {
		URL =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDutyh3MQSQI_Du4FRSvPU7XAYwVTOBVfQ';
	}
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};
	try {
		const response = yield axios.post(URL, authData);
		const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('token', response.data.idToken);
		yield localStorage.setItem('userId', response.data.localId);
		yield put(actions.authSuccess(response.data.idToken, response.data.localId));
		yield put(actions.checkAuthTimeout(response.data.expiresIn));
	} catch (error) {
		yield put(actions.authFail(error.response.data.error));
	}
	// Note in case of no internet connection the page hangs with the spinner.
	// The code below was suposed to take care of that, but it's not working.
	// try {
	// 	const response = yield axios.post(URL, authData);
	// 	const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
	// 	yield localStorage.setItem('expirationDate', expirationDate);
	// 	yield localStorage.setItem('token', response.data.idToken);
	// 	yield localStorage.setItem('userId', response.data.localId);
	// 	yield put(actions.authSuccess(response.data.idToken, response.data.localId));
	// 	yield put(actions.checkAuthTimeout(response.data.expiresIn));
	// } catch (err) {
	// 	// error.message = 'Some error occured check internet connection';
	// 	yield put(actions.authFail(action.error));
	// }
}

