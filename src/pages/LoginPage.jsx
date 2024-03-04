import '../styles/login.css'
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { Link, useNavigate  } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useUser();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/prueba")
      // window.location.href = "/prueba";
    }
  }, [isAuthenticated]);

  return (
    <div className='principal login-test'>
        <div className="container--login">
                {signinErrors.map((error, i) => (
                  <div className="bg-red-500 p-2 text-white text-center" key={i}>
                    {error}
                  </div>
                ))}
                <form onSubmit={onSubmit} className="form--box">
                    
                    <div className="container--input">
                        <input type="email" className="input-field placeholder" placeholder="Digite su usuario"
                        {...register("email", { required: true })}/>
                        <i className='bx bxs-user-account'> | </i>
                        {errors.email && <p className="text-red-500">Email is required</p>}
                    </div>
                    <div className="container--input">
                        <input type="password" name="user" id="user" required placeholder="Digite su contraseña"
                        {...register("password", { required: true })}/>
                        <i className='bx bxs-lock'> | </i>
                        {errors.password && (
                        <p className="text-red-500">Password is required</p>
                        )}
                    </div>
                    <div className="container--adiccionales">
                        <Link to={"/formRecovery"} className="login--link">He olvidado mi contraseña</Link>
                        <p><Link to={"/register"} className="login--link">¿No tienes un cuenta?  Registrate</Link></p>
                    </div>
                    <button type="submit">Iniciar sesión</button>
                    
                </form>
        </div>
    </div>
  );
}

export default LoginPage;
