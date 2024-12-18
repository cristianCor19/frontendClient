
import axios from 'axios'

// creacion de conexion con la api
const instance = axios.create({
    // baseURL: "https://back-infotect.vercel.app",
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export default instance
