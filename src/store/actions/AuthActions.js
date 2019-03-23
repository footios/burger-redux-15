import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
}

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    }
}

export const auth = (email, password) => {
  return dispatch => {
      dispatch(authStart());
    //   axios
    //   .post('/orders.json', authData)
    //   .then((response) => dispatch(authSuccess(response.data, authData)))
    //   .then((error) => dispatch(authFail(error)));
  }
}