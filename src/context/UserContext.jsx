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
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState([])
    
    


    //funcion para el registro de usuarios
    const signup = async (user) => {
        try {
            const res = await registerUserRequest(user)
            
            console.log(res.data.status);
            if(res.data.status === true) {
                console.log('prueba');
                console.log('entro');
                setUser(res.data)

            }
        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
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

    // funcion para realizar las verificaciones de seguridad respecto al manejo de tokens

    return (
        <UserContext.Provider
        value={{
            user,
            signup,
            errors,
            

            
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext 
