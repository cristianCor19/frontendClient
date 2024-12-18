import { useProduct } from "../context/ProductContext";
import { useState, useEffect } from "react";
import CardFavoriteProduct from "../components/CardFavoriteProduct"
import '../styles/cardFavoriteProduct.css'

function FavoriteProductsPage(){

    const { favorite, getFavorites } = useProduct();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadFavorites() {
        await getFavorites();
        setLoading(false);
        }
        loadFavorites();
    }, [getFavorites]);
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