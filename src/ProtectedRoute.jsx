import { Navigate, Outlet } from "react-router-dom";
import {useSession} from './context/SessionContext';

function ProtectedRoute (){
    const {loading, isAuthenticated} = useSession()

    if(loading) return <h1>Cargando...</h1>
    if(!isAuthenticated && !loading){
        console.log('entro protected');
        return <Navigate to='/login' replace />
    } 
        

    return <Outlet/>

}

export default ProtectedRoute