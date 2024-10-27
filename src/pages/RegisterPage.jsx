import '../styles/registerUser.css'

import {useForm} from 'react-hook-form'
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

function RegisterPage(){

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signup,  errors: registersErrors, registrationSuccess, setRegistrationSuccess} = useUser();
    const navigate = useNavigate()
    
    function justLetters(event) {
        const letra = event.key;
        const esLetra = /[a-zA-ZñÑá-úÁ-Ú ]/.test(letra);
        if (!esLetra) {
          event.preventDefault(); // Evita que se ingresen caracteres no permitidos
        }
    }

    
    const onSubmit = handleSubmit( async(values) =>{
    
        signup(values);

    })
    
    useEffect(() => {
        if(registrationSuccess){
            navigate('/login')
            setRegistrationSuccess(false)
        }
    },[registrationSuccess, navigate, setRegistrationSuccess]);

    return(
        <div className='principal '>
           
            <div className='container--register'>
                {
                    registersErrors.map((error, i) => (
                        <div className='bg-red-500  text-white text-errors-register' key={i}>
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

                        <input type="text" onKeyDown={justLetters}  {...register("name", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 input-register-name' placeholder='Nombre'/>
                        {
                            errors.name && (<p className='text-red-500'>El nombre es requerido</p>)
                        }

                        <input type="text" onKeyDown={justLetters}  {...register("lastname", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 input-register-lastname' placeholder='Apellido'/>
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