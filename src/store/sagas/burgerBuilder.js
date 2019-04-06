import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';

import * as actions from '../actions';

export function* initBurgerIngredientsSaga(action) {
	yield put(actions.loading());
	const response = yield axios.get('/ingredients.json');
	try {
		yield put(actions.startBurger(response.data));
	} catch (error) {
		yield put(actions.burgerFailed(error));
	}
}
