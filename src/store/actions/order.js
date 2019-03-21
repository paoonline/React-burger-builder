import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

// when click continue order set purchased: false for access checkout page
export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

// set before send data loading true
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

// when send data success
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

// when send data fail
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

// dispatch send data to db
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData)
        .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        })
        .catch(err => {
            dispatch(purchaseBurgerFail(err))
        })
    }
}

// when fetch order success then set loading false and orders from db
export const fetchOrdersSuccess = (orders) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

// when fetch order fail then set loading false and orders error after that 
// hoc be show modal error
export const fetchOrdersFail = (error) => {
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        orders: error
    }
}

// before fetch data set loading true
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

// authe token for access to order page
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json'+ queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }

                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            })
    }
}