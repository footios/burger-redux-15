import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios
			.post('/orders.json', orderData)
			.then((response) => dispatch(purchaseBurgerSuccess(response.data, orderData)))
			.then((error) => dispatch(purchaseBurgerFail(error)));
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

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

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart())
		axios
			.get('/orders.json')
			.then((res) => {
				console.log('Orders: ', res.data); // Why is 'data' what we get back from Firebase?
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