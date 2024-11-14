import { createContext, useState, useContext } from "react";
import {useEffect} from 'react'

import {
    registerUserRequest,
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
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const [errors, setErrors] = useState([])
    
    


    //funcion para el registro de usuarios
    const signup = async (user) => {
        try {
            const res = await registerUserRequest(user)
            console.log(res);
            if(res.data.status === true) {
                setRegistrationSuccess(true)

            }
        } catch (error) {

            console.log(error);
            
            setErrors(Array.isArray(error.response.data)
            ? error.response.data
            : [error.response.data.message])
            
        }
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

    return (
        <UserContext.Provider
        value={{
            registrationSuccess,
            signup,
            errors,
            setRegistrationSuccess  
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext 
