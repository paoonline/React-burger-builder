import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing:false,
        loading:false,
        error:null
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('https://react-my-burger-161d2.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients:res.data})
            })
            .catch(err => {
                this.setState({error:true})
            })
    }

    updatePurchaseState (ingredients){
      
        const sum = Object.keys(ingredients)
            .map(igKey => {
             
                return ingredients[igKey]
            })
            .reduce((sum, el) => {   
                   
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        // alert('you continue')

    // const queryParams =  []

    // for(let i in this.state.ingredients){
    //     queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.state.totalPrice);

    // const queryString = queryParams.join('&')

    this.props.history.push('/checkout')
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner/>
        if( this.props.ings){
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
                        price ={this.props.price}
                    />
                </React.Fragment>
            )

            orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
           
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps =dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))