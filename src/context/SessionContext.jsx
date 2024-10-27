import { createContext, useState, useContext } from "react";
import {useEffect} from 'react'
import { useQueryClient} from '@tanstack/react-query'

import { useProfile } from "../hooks/useProfile";

import {
    loginUserRequest,
    verifyUserTokenRequest,
    verifyUserRoleTokenRequest,
    searchRecoveryRequest,
    updatePasswordRecoveryRequest,
}from '../api/session'

import { getUserProfileRequest } from "../api/user";


export const SessionContext = createContext()

//creacion de la funcion para poder entrar al contexto o las funciones de autenticacion
export const useSession = () => {
    const context = useContext(SessionContext)

    if (!context) {
        throw new Error('useUser debe utilizarse dentro de un Userprovider')
    }

    return context
}

export const SessionProvider = ({children}) => {
    const [userInfo, setUser] = useState(null)
    const [email, setEmail] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    const [test1, setTest1] = useState(null)
    const queryClient = useQueryClient()

    var {data: profile, isLoading: profileLoading} = useProfile (
        userInfo?.id,
        localStorage.getItem('token')
    ) 
  
   
    //funciona para loguearse como cliente
    const signin = async (user) => {
        try{
            const res = await loginUserRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
            localStorage.setItem('token', res.data.token); 
            const resProfile = await getUserProfileRequest(res.data.token, res.data.data._id)  
            
            setTest1(resProfile.data)
  
        } catch (error) {
            setErrors(Array.isArray(error.response.data) 
              ? error.response.data 
              : [error.response.data.message])
        }

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
        localStorage.removeItem('token')
        setUser(null)
        setIsAuthenticated(false)
        queryClient.invalidateQueries(['profile'])
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
            const token = localStorage.getItem('token');

            console.log(token);
            if(!token){
                setIsAuthenticated(false)
                setLoading(false)
                return;
            }
            const res = await verifyUserRoleTokenRequest(token)
            console.log(res.data.role);
                if (res.data.role != 'customer') {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;
                }

                try {
                    
                    const res = await verifyUserTokenRequest(token)
                    
                    if(!res.data){
                        return setIsAuthenticated(false)
                    }
    
                    setIsAuthenticated(true)
                    setUser(res.data)
                    setLoading(false)

                } catch (error) {
                    
                    setIsAuthenticated(false)
                    setLoading(false)
                }
            
        }   
        
        checklogin()
    }, [])

    return (
        <SessionContext.Provider
        value={{
            userInfo,
            email,
            profile: profile || test1,
            searchRecovery,
            updatePasswordRecovery,
            signin,
            logout,
            loading: loading || profileLoading,
            isAuthenticated,
            errors
            
        }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContext 
