import { Link } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';

function CardSearchProduct({product}){
    const { addToCart, removeFromFavorite, } = useProduct();

    return(
        <div className='card-favorite-product-general'>
            
            <Link to={`/overview/${product.product_id}`}>
                <div className="grid margin-general-favorite">
                    <div className="image-favorite-product">
                        <img className='size-image-favorite' src={product.image} alt="" />
                    </div>
                    <div className='description-product-favorite'>
                        <div className="text-favorite-descrition ">
                            <h2 className='product-search-title'>{product.name}</h2>
                        </div>
                        <div>
                            <span className="text-xl font-bold">$ {product.price}</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm line-through opacity-40">$ 25000</span>
                                <span className="discount-percent">save 20%</span>
                            </div>
                        </div>
                        <div className='favorites-buttons'>
                            <button onClick={(e)=>{
                                e.preventDefault();
                                addToCart(product)

                            }}>Agregar al carrito</button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                removeFromFavorite(product.product_id)
                            }}>Eliminar</button>
                        </div>
                    </div>
                </div>       
            </Link>
        </div>
    )
}

export default CardSearchProduct