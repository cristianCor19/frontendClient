import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import '../styles/overview.css'
import start from "../assets/img/star.svg";
import FooterComponent from "../components/FooterComponent"


function OverviewProduct() {
  const { getProduct, product, addToCart, removeFromFavorite, addToFavorite, favorite, getFavorites } = useProduct();
  // const [heart, setHeart] = useState(false);
  const navigate = useNavigate()
  const [heart, setHeart] = useState(false);
  // const { getProduct } = useProduct();
  const params = useParams();

  const addToCartPay = (product) => {
    
    addToCart(product)
    navigate("/cartPage")
    
  };
  // type={favorite.filter(fav => fav.product_id == params.id) ? 'solid' : 'regular'}

  const toggleHeart = () => {
    // e.preventDefault(); 
    setHeart(prevHeart => !prevHeart);
    console.log(heart); 
  
};

  
  useEffect(() => {
    favorite.forEach(element => {
        if(element.product_id == params.id){
          setHeart(true)
        }
      
    });
    
    
  }, [favorite, params.id]);

  useEffect(() => {
    getProduct(params.id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getFavorites();
    };
    fetchData();
  }, []);


  return (
    <div>
      <div className="grid overview-column  margin-all-page ">
        {/* Contenido de la primera columna */}
        <div className=" p-4 overview-first-row">
          <div className=" flex items-center justify-center cart-test">
            <div className="overview-card">
              <img className="image-overview" src={product.image} alt="" />
              <div className="p-5  flex flex-col gap-3">
                {/* badge */}
                
              </div>
            </div>
          </div>
        </div>

        {/* Contenido de la segunda columna */}
        <div className=" p-10 overview-second-row">
          {/* product title */}
          <div className="flex">

              <h2 className="product-title text-3xl" title="Portatil acer nitro">
              {product.name}
              </h2>
              <button className="button-love-overview" onClick={() => {
                toggleHeart()
                heart ? removeFromFavorite(product._id) : addToFavorite(product)
              }}>
                {
                  
                <box-icon
                  type={heart ? 'solid' : 'regular'}
                  name='heart'
                ></box-icon>
                }
                  
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
          <div className="mt-2 description-overview">
            <span className="text-3xl font-bold">$ {product.price}</span>
            <p className="mt-1">Stock disponible</p><br />
            <p>Cantidad: <span className="font-bold">1 unidad </span>({product.quantity})</p>
            <div className="flex items-center gap-2 mt-5">
              <span className="text-sm line-through opacity-40">25000</span>
              <span className="discount-percent">save 20%</span>
            </div>
          </div>

          

          {/* product action button */}
          <div className="mt-8 lg:mt-16 flex gap-2 button-pay-overview">
            <button
              className="button-primary w-52"
              onClick={() => {
                addToCart(product);
              }}
            >
              Agregar al carrito
            </button>
            
          </div>
          <div className="mt-5 flex gap-2">
            <button
              className="button-primary w-52 bg-blue-500"
              onClick={() => {
                  addToCartPay(product);
              }}
            >
              Comprar ahora
            </button>
            
          </div>
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default OverviewProduct;
