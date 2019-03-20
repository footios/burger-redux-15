import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: true
};

export const fetchOrdersReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ORDERS:
			return {
				orders: [ ...action.orders ], // concat is not working as expected!!!
				loading: false
			};
		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false
			};
		case actionTypes.DELETE_ORDER:
			const orders = state.orders.filter((order) => order.id !== action.orderId);
			return {
				...state,
				loading: false,
				orders: orders
			};
		case actionTypes.DELETE_ORDER_ON_SERVER:
			return {
				...state
			};
		default:
			return state;
	}
};
