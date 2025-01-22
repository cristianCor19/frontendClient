
import axios from 'axios'

// creacion de conexion con la api
const instance = axios.create({
    baseURL: "https://back-infotect.vercel.app",
    // baseURL: '',
    withCredentials: true
})

export default instance
