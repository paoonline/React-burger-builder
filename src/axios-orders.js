import axios from 'axios'

// api variable
const instance = axios.create({
    baseURL:'https://react-my-burger-161d2.firebaseio.com/'
})
//

export default instance