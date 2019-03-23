import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    authData: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                authData: action.authData,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}