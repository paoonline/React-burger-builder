import React,{Component} from 'react';
import { connect } from 'react-redux'
import classes from './Layout.css'
import Toolbar from  '../../components/Navagation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navagation/SideDrawer/SideDrawer'

class Layout extends Component {
    state ={
        showSideDrawer: false
    }

    // Closed drawer
    sideDrawerClosedHandler = () => {
        console.log(false)
        this.setState({showSideDrawer:false})
    }
    //

    // Open drawer
    sideDrawerToggleHandler = () => {
      
        this.setState((prevState)=>{
            console.log(!prevState.showSideDrawer)
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    //

    render(){
        return(
            <React.Fragment>
            {/* send props to closed/open modal */}
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
            {/* */}
        </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated : state.auth.token !== null // render menu from auth
    }
}
export default connect(mapStateToProps)(Layout)