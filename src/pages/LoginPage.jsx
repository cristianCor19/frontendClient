import '../styles/login.css'
import { useForm } from "react-hook-form";
import { useSession } from "../context/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const { register, handleSubmit,
    formState: { errors }, setValue} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { signin, errors: signinErrors, isAuthenticated } = useSession();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signin(data);
      if (!isAuthenticated) {
        setValue('password', '');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  });


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='absolute inset-0 bg-cover bg-center flex items-center justify-center h-screen text-center'
    style={{
      backgroundImage: "linear-gradient(rgba(30, 77, 109, 0.78), rgba(2, 55, 90, 0.78)), url(/img/fondo1.avif) "
    }}
    >
      <div className="container--login"
        
      >
        {signinErrors.map((error, i) => (
          <div 
            className="bg-red-500 text-white text-center text-errors" 
            key={i}
          >
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit} className="form--box ">
          <div className="container--input">
            <input
              type="email"
              className="input-field placeholder"
              placeholder="Digite su usuario"
              {...register("email", { 
                required: "El correo es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "correo inválido"
                }
              })}
            />
            <i className='bx bxs-user-account'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </i>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="container--input">
            <input
              type="password"
              className="input-field"
              placeholder="Digite su contraseña"
              {...register("password", { 
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 8 caracteres"
                }
              })}
            />
            <i className='bx bxs-lock'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </i>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="container--adiccionales">
            <Link to="/formRecovery" className="login--link">
              He olvidado mi contraseña
            </Link>
            <p>
              <Link to="/register" className="login--link">
                ¿No tienes un cuenta? Registrate
              </Link>
            </p>
          </div>

          <button type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;