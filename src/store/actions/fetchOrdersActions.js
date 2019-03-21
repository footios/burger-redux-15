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

export const deleteOrder = (id) => {
	return {
		type: actionTypes.DELETE_ORDER,
		orderId: id, 
	}
}

export const deleteOrderOnServer = (id) => {
	return dispatch => {  
		axios
		// .delete('/orders.json/' + id ) // nothing!
		// .delete('/orders.json/', id ) // deletes all orders
		// .delete('/orders.json/', { data: { ID: id } } ) // everything
		.then(() => dispatch(deleteOrder(id)))
		.then((error) => error);
    }
}