import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const fetchOrders = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        orders: orders
    }
}

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const getOrders = () => {
    return dispatch => {
        axios
			.get('/orders.json')
			.then((res) => {
				console.log('Orders: ', res.data); 
				//convert the object into an array:
				const fetchedOrders = [];
				for (const key in res.data) {
					if (res.data.hasOwnProperty(key)) {
						fetchedOrders.push({ ...res.data[key], id: key });
					}
				}
				dispatch(fetchOrders(fetchedOrders))
			})
			.catch((err) => dispatch(fetchOrdersFail(err)));
    }
}