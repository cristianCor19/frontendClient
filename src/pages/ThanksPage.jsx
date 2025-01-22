import '../styles/thanksPage.css'

function ThanksPage(){
    return (
        <div className='container-thanks-page'>
            <section className='message-thanks'>

                <h1>Muchas gracias por su compra!</h1>
            </section>
            <section className='social-networks-thanks'>
                {/* <p>En breve recibirá un correo con los detalles de su compra</p> */}
                <p>Siguenos  tambien en nuestras redes sociales</p>
                <div className='networks-icons-thanks'>
                    <a href=""><i className="fa-brands fa-facebook"></i></a>
                    <a href=""><i className="fa-brands fa-instagram"></i></a>
                    <a href=""><i className="fa-brands fa-twitter"></i></a>
                </div>
            </section>

        </div>
    )
}

export default ThanksPage