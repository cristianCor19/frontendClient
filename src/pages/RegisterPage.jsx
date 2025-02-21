import '../styles/registerUser.css'

import {useForm} from 'react-hook-form'
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

function RegisterPage(){

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            lastname: '',
            phone: '',
            email: '',
            password: ''
        }
    });
    const {signup,  errors: registersErrors, registrationSuccess, setRegistrationSuccess} = useUser();
    const navigate = useNavigate()
    
    function justLetters(event) {
        const letra = event.key;
        const esLetra = /[a-zA-ZñÑá-úÁ-Ú ]/.test(letra);
        if (!esLetra) {
          event.preventDefault(); // 
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
        <div className='principal register-main '
        
        >
           
            <div className='container--register absolute inset-0 bg-cover bg-center '
                style={{
                    backgroundImage: "linear-gradient(rgba(30, 77, 109, 0.78), rgba(2, 55, 90, 0.78)), url(/img/fondo1.avif) "
                }}
            >
                {
                    registersErrors.map((error, i) => (
                      
                        <div className='bg-red-500 text-white text-errors-register' key={i}>
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

                    <div className='container-register-input-second'>
                        <input type="text" onKeyDown={justLetters} 
                          placeholder='Nombre' className='w-full bg-zinc-700 text-white px-4 rounded-md input-register-name' 
                          {...register("name",{
                            required: "El nombre es requerido"

                          })} 
                        />
                        {errors.name && (
                            <p className='errors-input-register'>{errors.name.message}</p>
                        )}


                        <input type="email" placeholder='Correo'
                          className='w-full bg-zinc-700 text-white px-4 rounded-md' 
                          {...register("email", {
                            required: 'El correo es requerido',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Correo inválido'
                            }
                          })} 
                          />
                        {errors.email && (
                            <p className='errors-input-register'>{errors.email.message}</p>
                        )}

                        <input type="password" placeholder='Contraseña'
                          className='w-full bg-zinc-700 text-white px-4 rounded-md ' 
                          {...register("password", {
                            required: 'La contraseña es requerida',
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe tener al menos 8 caracteres'
                            }
                          })} 
                          />
                        {errors.password && (
                            <p className='errors-input-register'>{errors.password.message}</p>
                        )}
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