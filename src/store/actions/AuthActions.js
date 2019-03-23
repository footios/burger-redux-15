import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDutyh3MQSQI_Du4FRSvPU7XAYwVTOBVfQ'
        if (!isSignup) {
            URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDutyh3MQSQI_Du4FRSvPU7XAYwVTOBVfQ'
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
    axios
      .post(URL, authData)
      .then((response) => {
          console.log(response);
          dispatch(authSuccess(response.data.idToken, response.data.localId))
      })
      .then()
      .catch((error) => dispatch(authFail(error.response.data.error)));
  }
}