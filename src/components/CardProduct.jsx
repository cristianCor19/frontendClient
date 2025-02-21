import { useEffect, useState, useCallback } from "react";
import { useProduct } from "../context/ProductContext";
import { useSession } from "../context/SessionContext";

import { Link } from "react-router-dom";

function CardProduct({ product }) {
  const {
    addToCart,
    addToFavorite,
    removeFromFavorite,
    favorite,
    isLoadingFavorites
  } = useProduct();
  const { isAuthenticated } = useSession();
  const [iconHeart, setIconHeart] = useState(false);

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      addToCart(product);
    },
    [product, addToCart]
  );

  const handleFavoriteToggle = useCallback(
    (e) => {
      e.preventDefault();
      if(isLoadingFavorites) return;

      const newHeartState = !iconHeart;
      if (newHeartState) {
        addToFavorite(product);
      } else {
        removeFromFavorite(product._id);
      }

    },
    [product,iconHeart, removeFromFavorite, addToFavorite, isLoadingFavorites]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setIconHeart(false);
      return;
    }
    const isFavorite = favorite.some((item) => item.product_id === product._id);
    setIconHeart(isFavorite);

  }, [favorite, product._id, isAuthenticated]);
  
  return (
    <div className=" flex items-center justify-center cart-test">
      <Link to={`/overview/${product._id}`}>
        <div className="card">
          <img
            className="size-image"
            src={product.image}
            alt=""
            loading="lazy"
          />
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
              <span className="text-xl font-bold">{product.price}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm line-through opacity-40">25000</span>
                <span className="discount-percent">save 20%</span>
              </div>
            </div>

            {/* product rating */}
            <span className="flex item-center mt-1">
              <img src="img/star.svg" alt="" />
              <img src="img/star.svg" alt="" />
              <img src="img/star.svg" alt="" />
              <img src="img/star.svg" alt="" />
              <img src="img/star.svg" alt="" />
              <span className="text-xs ml-2 text-gray-500">(1000)</span>
            </span>

            {/* product action button */}
            <div className="mt-5 flex gap-2">
              <button className="button-primary" onClick={handleAddToCart}>
                Agregar
              </button>
              <button className="button-icon" onClick={handleFavoriteToggle}>
                <box-icon
                  type={iconHeart ? "solid" : "regular"}
                  name="heart"
                ></box-icon>
              </button>
              <button className="button-icon">
                <img className="opacity-70" src="img/eye.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardProduct;
