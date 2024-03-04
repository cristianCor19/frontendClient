import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import '../styles/overview.css'
import start from "../assets/img/star.svg";
import love from "../assets/img/love.svg";

function OverviewProduct() {
  const { getProduct, product, addToCart } = useProduct();
  const navigate = useNavigate()
  // const { getProduct } = useProduct();
  const params = useParams();

  const addToCartPay = (product) => {
    
    addToCart(product)
    navigate("/cartPage")
    
  };

  useEffect(() => {
    getProduct(params.id);
  }, []);

  return (
    <div className="grid overview-column  margin-all-page">
      {/* Contenido de la primera columna */}
      <div className="bg-gray-200 p-4 overview-first-row">
        <div className=" flex items-center justify-center cart-test">
          <div className="overview-card">
            <img className="" src={product.image} alt="" />
            <div className="p-5  flex flex-col gap-3">
              {/* badge */}
              
            </div>
          </div>
        </div>
      </div>

      {/* Contenido de la segunda columna */}
      <div className="bg-red-400 p-10 overview-second-row">
        {/* product title */}
        <div className="flex">

            <h2 className="product-title" title="Portatil acer nitro">
            {product.name}
            </h2>
            <button className="">
                <img className="opacity-100" src={love} alt="" />
            </button>
        </div>

        {/* product rating */}
        <span className="flex item-center mt-1">
          <img src={start} alt="" />
          <img src={start} alt="" />
          <img src={start} alt="" />
          <img src={start} alt="" />
          <img src={start} alt="" />

          <span className="text-xs ml-2 text-gray-500">(1000)</span>
        </span>
        {/* product price */}
        <div>
          <span className="text-xl font-bold">{product.price}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm line-through opacity-40">25000</span>
            <span className="discount-percent">save 20%</span>
          </div>
        </div>

        

        {/* product action button */}
        <div className="mt-5 flex gap-2">
          <button
            className="button-primary"
            onClick={() => {
              addToCart(product);
            }}
          >
            Agregar al carrito
          </button>
          
        </div>
        <div className="mt-5 flex gap-2">
          <button
            className="button-primary"
            onClick={() => {
                addToCartPay(product);
            }}
          >
            Comprar ahora
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default OverviewProduct;
