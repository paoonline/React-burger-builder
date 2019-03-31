import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
} 

// when click continue order set purchased: false for access checkout page
const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false})
}

// set before send data loading true
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading:true})
}

// when send data success
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId})
    return updateObject(state, { 
        loading:false,
        purchased: true,
        orders:state.orders.concat(newOrder)})
}

// when send data fail
const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading:false})
}

// before fetch data set loading true
const fetch_orders_start = (state, action) => {
    return updateObject(state, { loading:true})
}

// when fetch order success then set loading false and orders from db
const fetch_orders_success = (state, action) => {
    return  updateObject(state, {orders: action.orders, loading:false})
}

// when fetch order fail then set loading false and orders error after that 
// hoc be show modal error
const fetch_orders_fail = (state, action) => {
    return updateObject(state, { loading:false})
}

// return reducer from variable
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action)
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFailed(state, action)       
        case actionTypes.FETCH_ORDERS_START:
            return fetch_orders_start(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: 
            return fetch_orders_success(state, action)
        case actionTypes.FETCH_ORDERS_FAIL:
           return fetch_orders_fail(state, action)
            
        default:
            return state
    }
}

export default reducer