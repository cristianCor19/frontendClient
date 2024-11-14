import { useProduct } from "../context/ProductContext";
import '../styles/CardFavoriteProduct.css'
import CardFavoriteProduct from "../components/CardFavoriteProduct"

function FavoriteProductsPage(){

    const {favorite} = useProduct();
    return(
        <div className="margin-all-favorite-products">
            {favorite.length === 0 ? (
                <p className="">No hay productos</p>

            ):(
                favorite.map((product) =>(

                    <CardFavoriteProduct product={product} key={product._id}/>
                ))
                
            )}
        </div>
    )
}

export default FavoriteProductsPage