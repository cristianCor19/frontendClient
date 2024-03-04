import SliderComponent from "../components/SliderComponent"
import FooterComponent from "../components/FooterComponent"
import '../styles/HomePage.css'

function HomePage () {
    return (
        <div>
            <SliderComponent></SliderComponent>
            <div className="container__favorites">
                <div className="container__ubicacion">
                    <img src="/img/favorite1.jpg" alt="" className="ubicacion__img"/>
                    <div className="ubicacion__description">
                        <h2 className="ubicacion__title">Visítanos en nuestra ubicación</h2>
                        <a href="" className="ubicacion__link">Sogamoso, Boyacá
                        </a>
                    </div>
                </div>
                <div className="container__facebook">
                    <img src="/img/favorite2.jpg" alt="" className="facebook__img"/>
                    <div className="facebook__description">
                        <h2 className="facebook__title">Síguenos en Facebook</h2>
                        <a href="" className="facebook__link">Facebook
                        </a>
                    </div>
                </div>

            </div>
            <FooterComponent></FooterComponent>
        </div>
    )
}

export default HomePage