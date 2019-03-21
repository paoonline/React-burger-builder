import React  from 'react'
import classes from './DrawerToggle.css'

// return burger button on/off drawer
const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
//

export default drawerToggle