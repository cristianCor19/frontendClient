import '../styles/registerUser.css'

import {useForm} from 'react-hook-form'
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage(){

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signup, isAuthenticated, errors: registersErrors} = useUser();
    const navigate = useNavigate()
    
    useEffect(() => {
        if(isAuthenticated) navigate('/prueba')
    }, [isAuthenticated])
    
    const onSubmit = handleSubmit( async(values) =>{
        console.log(values);
        signup(values);
    })
    


    return(
        <div className='principal '>
           
            <div className='container--register'>
                {
                    registersErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                    
                <form onSubmit={onSubmit} className='form--register-user'>
                    <div className='header-register-user'>
                        <h3 className='title--register'>Bienvenido</h3>
                        <p className='text-register-description'>
                            Cree su cuenta, es gratis y sólo le llevará un minuto
                        </p>

                    </div>
                    <div className='container-register-input-firts'>

                        <input type="text" {...register("name", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 input-register-name' placeholder='Nombre'/>
                        {
                            errors.name && (<p className='text-red-500'>El nombre es requerido</p>)
                        }

                        <input type="text" {...register("lastname", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 input-register-lastname' placeholder='Apellido'/>
                        {
                            errors.lastname && (<p className='text-red-500'>El apellido es requerido</p>)
                        }
                    </div>
                    <div className='container-register-input-second'>

                        <input type="number" {...register("phone", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Telefono'/>
                        {
                            errors.phone && (<p className='text-red-500'>El telefono es requerido</p>)
                        }

                        <input type="email" {...register("email", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Correo'/>
                        {
                            errors.email && (<p className='text-red-500'>El correo es requerido</p>)
                        }

                        <input type="password" {...register("password", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña'/>
                        {
                            errors.password && (<p className='text-red-500'>Password is required</p>)
                        }
                    </div>
                    <p className='text-center description--register-text'>
                    ¿Ya tienes una cuenta?
                        <Link to="/login" className='text-sky-500 link-login-register'>Login</Link>
                    </p>
                    <div className='container-button-register'>
                        <button type='submit'>
                            Registrarse
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default RegisterPage