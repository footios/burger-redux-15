import * as actionTypes from '../actions/actionTypes'
import axios from '../../axios-orders'

const initialState = {
    orders: [],
    loading: true
}

export const fetchOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS:
            return {
                orders: [...action.orders],
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_ORDER:
            const orders = state.orders.filter(order => order.id !== action.orderId)
            axios
			.delete('/orders.json', orders.id)
			.then((response) => console.log(response))
			.then((error) => error);
            return {
                ...state,
                loading: false,
                orders: orders
            }
        default:
            return state
    }
}

