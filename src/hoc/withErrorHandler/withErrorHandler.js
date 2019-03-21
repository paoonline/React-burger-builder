import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'


// check data from fetch then return components
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error:null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req;
            })

            this.resInteceptor =  axios.interceptors.response.use(res => res, error => {
                this.setState({error:error})
            })
        }

        componentWillUnmount (){

            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInteceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }
        render(){
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error} 
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler