import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

// add ings then return new state
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

// remove ings then return new state
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

// set default ings then return new state
export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

// set throw error from api then return new state
export const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

// get default ings to return new state
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-161d2.firebaseio.com/ingredients.json')
        .then(response => {
           dispatch(setIngredients(response.data))
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed())
        })
    }
}