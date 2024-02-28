function MessageRecovery({ email }) {
  return (
    <div className='text-center'>
      <p className='text-green-500'>Cuenta encontrada</p>
      <p>Hemos enviado un mensaje a tu correo: {email}</p>
    </div>
  );
}

export default MessageRecovery
