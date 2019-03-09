import React,{Component} from 'react';
import { connect } from 'react-redux'
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
            <Toolbar
                isAuth={this.props.isAuthenticated}
                drawerToggleCliked={this.sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout)