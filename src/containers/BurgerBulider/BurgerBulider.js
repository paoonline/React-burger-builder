import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {
    //disabled Modal Order case purchasing = false
    state = {
        purchasing:false,
    }
    //

    componentDidMount(){
        //set initial burger
            this.props.onInitIngredients()
        //
    }

    updatePurchaseState (ingredients){
        // update Ing then send props to BuildControls Components
        const sum = Object.keys(ingredients)
            .map(igKey => {
             
                return ingredients[igKey]
            })
            .reduce((sum, el) => {   
                   
                return sum + el
            }, 0)
        return sum > 0
        //
    }

    purchaseHandler = () =>{
        //check authen before order
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        //
    }

    purchaseCancelHandler = () => {
        //cancel order then closed modal
            this.setState({purchasing:false})
        //
    }

    purchaseContinueHandler = () => {
        // set purchasing:false for to checkout page
            this.props.onInitPurhchase()
            this.props.history.push('/checkout')
        //
    }

    render(){
        //check order valid
        const disabledInfo = {
            ...this.props.ings
        }
        
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        //check order valid

        // check props that there error 
        let burger = this.props.error ? <p>ingredients can't be loaded</p> : <Spinner/>
        //

        let orderSummary = null
        
        // check ings
        if( this.props.ings){
            // component Burger, BuildControls render from props show update burger
            burger = 
            (
                <React.Fragment>
                    <Burger ingredients = {this.props.ings} />
                    <BuildControls 
                        ingredientsAdded = {this.props.onIngredientAdded} 
                        ingredientsRemove = {this.props.onIngredientRemoved}
                        disabled ={disabledInfo}
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price ={this.props.price}
                    />
                </React.Fragment>
            )
            
            // component OrderSummary render from props show modal
            orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
            //
        }
 
        return (
            // check modal on off form purchasing state and render burger component
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
            //
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)), // Add ings
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)), // Remove ings
        onInitIngredients: () => dispatch(actions.initIngredients()), // initial ing
        onInitPurhchase : () => dispatch(actions.purchaseInit()), // set purchase false for continue
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)) // case no auten then retun path from reducer 
    }
}

// hoc wrapped
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))