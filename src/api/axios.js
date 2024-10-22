
import axios from 'axios'

// creacion de conexion con la api
const instance = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true
})

export default instance