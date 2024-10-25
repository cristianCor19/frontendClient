import { useForm } from 'react-hook-form';
import { useSession } from '../context/SessionContext';
import MessageRecovery from '../components/MessageRecovery';

function RecoveryPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { searchRecovery, errors: signinErrors, user, email } = useSession();


  const onSubmit = handleSubmit(data => {
    searchRecovery(data);
  });

  // Renderiza el componente MessageRecovery si la recuperación fue exitosa
  if (user && email) {
    return (
      <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='bg-blue-300 max-w-md w-full p-10 rounded-md'>
          <MessageRecovery user={user} email={email} />
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-blue-300 max-w-md w-full p-10 rounded-md'>
        {signinErrors.map((error, i) => (
          <div className='bg-red-500 p-2 text-white text-center' key={i}>
            {error}
          </div>
        ))}
        <h1 className='text-2xl font-bold my-2'>Recupera tu cuenta</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='email'
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}
          <button className='bg-sky-500 text-white px-4 py-2 rounded-md my-2' type='submit'>
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecoveryPage;
