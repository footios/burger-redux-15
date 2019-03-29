// no need of enzyme because we don't render components 
import * as actionTypes from '../actions/actionTypes'
import { authReducer } from './authReducer'

describe('authReducer', () => {
    it('return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
            authInitialized: false
        })
    })

    it('store token and userId', () => {
        expect(authReducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
            authInitialized: false
        }, 
        {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'token',
            userId: 'userId'
        }
        )).toEqual({
            token: 'token',
            userId: 'userId',
            error: null,
            loading: false,
            authRedirectPath: '/',
            authInitialized: false
        })
    })
})
