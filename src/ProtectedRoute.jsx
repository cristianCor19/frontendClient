import { Navigate, Outlet } from "react-router-dom";
import {useUser} from './context/UserContext'

function ProtectedRoute (){
    const {loading, isAuthenticated} = useUser()

    if(loading) return <h1>Cargando...</h1>
    if(!isAuthenticated && !loading){
        console.log('entro protected');
        return <Navigate to='/login' replace />
    } 
        

    return <Outlet/>

}

export default ProtectedRoute