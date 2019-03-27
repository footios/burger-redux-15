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

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart())
		/* 
		orderBy 
		that is a query parameter understood by firebase 
		which allows us to order our data. It tells firebase: 
		hey you can filter by that.
		So I want to orderBy my user ID property.  
		Note:  the value or the property name by which you
		want to order (userId),
		it should be enclosed in in double quotation marks.
		
		equalTo
		This always refers to the key you're ordering by.
		So we can say we want to orderBy that userId property 
		on our firebase data and we only want to fetch
		the data where this userId is equalTo.
		Note:  the value or the property name by which you
		want to order (userId),
		it should be enclosed in in double quotation marks.
		*/
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios
			.get('/orders.json' + queryParams)
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