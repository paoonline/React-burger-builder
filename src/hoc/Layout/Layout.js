import React,{Component} from 'react';

import classes from './Layout.css'
import Toolbar from  '../../components/Navagation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navagation/SideDrawer/SideDrawer'

class Layout extends Component {
    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <React.Fragment>
            <Toolbar drawerToggleCliked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
        )
    }
}
export default Layout