
import axios from 'axios'

// creacion de conexion con la api
const instance = axios.create({
    baseURL: 'https://backinfotect.onrender.com',
    withCredentials: true
})

export default instance