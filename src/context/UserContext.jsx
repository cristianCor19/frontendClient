import { createContext, useState, useContext } from "react";
import {useEffect} from 'react'




import {
    registerUserRequest,
    loginUserRequest,
    verifyUserTokenRequest,
    verifyUserRoleTokenRequest,
    searchRecoveryRequest,
    updatePasswordRecoveryRequest,
    getUserProfileRequest
}from '../api/user'


export const UserContext = createContext()

//creacion de la funcion para poder entrar al contexto o las funciones de autenticacion
export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser debe utilizarse dentro de un Userprovider')
    }

    return context
}


export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [email, setEmail] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    
    


    //funcion para el registro de usuarios
    const signup = async (user) => {
        try {
            const res = await registerUserRequest(user)
            console.log(res);
            console.log(res.data.status);
            if(res.data.status === true) {
                console.log('prueba');
                console.log('entro');
                setUser(res.data)
                setIsAuthenticated(true)
                localStorage.setItem('token', res.data.token);
                getUserProfile(res.data.token, res.data.data._id)

            }
        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    //funciona para loguearse como cliente
    const signin = async (user) => {
        try{
            console.log('entro login');
            const res = await loginUserRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
            localStorage.setItem('token', res.data.token);
            getUserProfile(res.data.token, res.data.data._id)


        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }

    }

    const getUserProfile = async(token, id)=>{

        const res = await getUserProfileRequest(token, id)
        setProfile(res.data)
    }

    //function to send search for the account 
    const searchRecovery = async(email) => {
        try{
            console.log('entro a buscar cuenta');
            const res = await searchRecoveryRequest(email)
            console.log(res);
            setUser(res.data)
            setEmail(res.data.email)
            console.log(res.data.email);
            // setIsAuthenticated(true)

        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }
    }


    //function to send search for the account 
    const updatePasswordRecovery = async(data) => {
        try{
            console.log('entro a buscar cuenta');
            const res = await updatePasswordRecoveryRequest(data)
            console.log(res);

        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }
    }




    //funcion para desloguearse
    const logout = () => {
        console.log('salir del login');
        localStorage.removeItem('token')
        setUser(null)
        setIsAuthenticated(false)
    }

    //funcion paar quitar los mensajes de error, despues de cierto tiempo

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [errors])

    // funcion para realizar las verificaciones de seguridad respecto al manejo de tokens
    useEffect(() => {
        async function checklogin () {
            // const cookies = Cookies.get()

            const token = localStorage.getItem('token');

            console.log(token);
            if(!token){
                console.log('entro hiii');
                setIsAuthenticated(false)
                setLoading(false)
                return;
            }
            const res = await verifyUserRoleTokenRequest(token)
            console.log(res.data.role);
                if (res.data.role != 'customer') {
                    console.log(' verification of roles');
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;
                }

                try {

                    console.log('prueba token');
                    const res = await verifyUserTokenRequest(token)
                    // console.log(res);
                    if(!res.data){
                        return setIsAuthenticated(false)
                    }
    
                    setIsAuthenticated(true)
                    setUser(res.data)
                    setLoading(false)
                    getUserProfile(token, res.data._id)

                    
                } catch (error) {
                    
                    setIsAuthenticated(false)
                    setLoading(false)
                }
            
        }   
        
        checklogin()
    }, [])

    return (
        <UserContext.Provider
        value={{
            user,
            profile,
            email,
            signup,
            searchRecovery,
            updatePasswordRecovery,
            signin,
            logout,
            loading,
            isAuthenticated,
            errors
            
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext 
