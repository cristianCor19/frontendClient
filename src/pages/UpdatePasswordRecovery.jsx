import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Importa useParams de react-router-dom

function RecoveryPage() {
  const { id } = useParams(); // Extrae el ID de la URL
  console.log(id);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { updatePasswordRecovery, errors: signinErrors } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async data => {
    // Realiza la lógica de recuperación aquí, si es necesario
    await updatePasswordRecovery({...data, id});
    navigate("/login");
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center margin-all-page'>
      <div className='bg-blue-300 max-w-md w-full p-10 rounded-md'>
        {signinErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center' key={i}>
            {error}
          </div>
        ))}
        <h1 className='text-2xl font-bold my-2'>Actualizar contraseña</h1>
        <form onSubmit={onSubmit}>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
              className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 pr-10'
              placeholder='Nueva contraseña'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute top-1/2 right-2 transform -translate-y-1/2'
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {errors.password && <p className='text-red-500'>Password is required</p>}

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: true,
                
              })}
              className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 pr-10'
              placeholder='Confirmar contraseña'
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute top-1/2 right-2 transform -translate-y-1/2'
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}

          <button
            className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
            type='submit'
            disabled={isSubmitting}
          >
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecoveryPage;
