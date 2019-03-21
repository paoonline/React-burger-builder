import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

// initial Structure to create ingredients
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]
//

// render Curennt price and ings from props and check props Auth
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (

            <BuildControl 
            
            key={ctrl.label} 
            label ={ctrl.label}
            added={() => props.ingredientsAdded(ctrl.type)} 
            removed={() => props.ingredientsRemove(ctrl.type)}
            disabled={props.disabled[ctrl.type]} 
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW': 'SIGN UP TO ORDER'}</button>
            
    </div>
)
//

export default buildControls