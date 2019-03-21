import * as actionTypes from '../actions/actionTypes'
import { updateObject } from  '../../shared/utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

// return new state before login success
const authStart = (state, action) => {
    return updateObject(state, {error:null, loading:true})
}

// return new state after login success 
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

// return new state authen fail
const authFail = (state, action) => {
    return updateObject(state,{
        error: action.error,
        loading: false
    })
}

// return new state remove localStorage for logout
const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null})
}

// check cookie expire then return new state
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
}

// return reducer from variable
const reducer  = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action)
        default:
            return state;
    }   
}

export default reducer