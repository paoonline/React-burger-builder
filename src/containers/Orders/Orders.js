import React,{Component} from 'react'
import {connect} from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount(){
        // authen for access to Orders page
        this.props.onFetchOrders(this.props.token, this.props.userId)
        //
    }

    render() {
        let orders = <Spinner />

        // Check loadingState to false
        if(!this.props.loading){
            // send props to Order
            orders =  this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
                )
            )
        }
        //
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders, // order props
        loading: state.order.loading, // loading props
        token: state.auth.token, // for authen
        userId: state.auth.userId // for authen
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)) //get Token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))