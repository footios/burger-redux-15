import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDutyh3MQSQI_Du4FRSvPU7XAYwVTOBVfQ'
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
    axios
      .post(URL, authData)
      .then((response) => {
          console.log(response);
          dispatch(authSuccess(response.data))
      })
      .then()
      .catch((error) => dispatch(authFail(error)));
  }
}