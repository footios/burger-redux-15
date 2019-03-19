import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false
}

export const fetchOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS:
            return {
                orders: state.orders.concat(action.orders),
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}