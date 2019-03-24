import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'


export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCES,
		orders: orders
	}
}

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrders = (token) => {
	return dispatch => {
		dispatch(fetchOrdersStart())
		axios
			.get('/orders.json?auth=' + token)
			.then((res) => {
				console.log('Orders: ', res.data); 
				//convert the object into an array:
				const fetchedOrders = [];
				for (const key in res.data) {
					if (res.data.hasOwnProperty(key)) {
						fetchedOrders.push({ ...res.data[key], id: key });
					}
				}
				dispatch(fetchOrdersSuccess(fetchedOrders))
			})
			.catch((err) => dispatch(fetchOrdersFail()));
	}
}