import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

function OverviewProduct() {
  const { getProduct, product, addToCart } = useProduct();
  // const { getProduct } = useProduct();
  const params = useParams();

//   console.log(product);


  useEffect(() => {
    getProduct(params.id)
  }, [params.id]);

  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-2 gap-20">
      {/* Contenido de la primera columna */}
      <div className="bg-gray-200 p-4">
      <div className="card">
                <img className="w-full h-full object-cover" src={product.image} alt="" />
                <div className="p-5  flex flex-col gap-3">
                    {/* badge */}
                    <div className="flex items-center gap-2">
                        <span className="badge">Stock ready</span>
                        <span className="badge">Ofical store</span>
                    </div>

                    {/* product title */}
                    <h2 className="product-title" title="Portatil acer nitro">
                        {product.name}
                    </h2>

                    {/* product price */}
                    <div>
                        <span className="text-xl font-bold">
                            {product.price}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm line-through opacity-40">
                                25000
                            </span>
                            <span className="discount-percent">
                                save 20%
                            </span>

                        </div>
                    </div>

                    {/* product rating */}
                    <span className="flex item-center mt-1">
                        <img src="/img/star.svg" alt="" />
                        <img src="/img/star.svg" alt="" />
                        <img src="/img/star.svg" alt="" />
                        <img src="/img/star.svg" alt="" />
                        <img src="/img/star.svg" alt="" />
                        <span className="text-xs ml-2 text-gray-500">
                            (1000)
                        </span>

                    </span>

                    {/* product action button */}
                    <div className="mt-5 flex gap-2">
                        <button className="button-primary" onClick={()=>{
                            addToCart(product)
                        }}>
                            Agregar al carrito
                        </button>
                        <button className="button-icon">
                            <img className="opacity-40" src="/img/love.svg" alt="" />
                        </button>
                        

                    </div>

                </div>
            </div>
      </div>

      {/* Contenido de la segunda columna */}
      <div className="bg-gray-300 p-4">
        {/* Tu contenido para la segunda columna */}
      </div>
    </div>
  );
}

export default OverviewProduct;