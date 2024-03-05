import '../styles/cardProductSearch.css'
import { Link } from 'react-router-dom';
import love from "../assets/img/love.svg";
import start from "../assets/img/star.svg";

function CardSearchProduct({product}){
    return(
        <div className='card-search-product-general'>

            <div className="grid container--image-search margin-general">
                <div className="image-search-product">
                    <Link to={`/overview/${product._id}`}>
                        <img className='size-image-product' src={product.image} alt="" />
                    </Link>
                </div>
                <div className='description-product-search'>
                    <div className="text-search-descrition ">
                        <Link to={`/overview/${product._id}`}>
                            <h2 className='product-search-title'>{product.name}</h2>
                        </Link>
                        <div className='button-love-search'>

                        <button >
                            <img className="opacity-100 " src={love} alt="" />
                        </button>
                        </div>
                    </div>
                    <div>
                        <span className="text-xl font-bold">{product.price}</span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm line-through opacity-40">25000</span>
                            <span className="discount-percent">save 20%</span>
                        </div>
                    </div>
                    <span className="flex item-center mt-1">
                        <img src={start} alt="" />
                        <img src={start} alt="" />
                        <img src={start} alt="" />
                        <img src={start} alt="" />
                        <img src={start} alt="" />

                        <span className="text-xs ml-2 text-gray-500">(1000)</span>
                    </span>
                </div>
            </div>
            
            
        </div>
    )
}

export default CardSearchProduct