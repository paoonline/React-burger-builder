import React  from 'react'
import classes from './Backdrop.css'

//check props for show backdrop
const backdrop = (props) => (
   props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop