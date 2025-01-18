import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useProduct } from "../context/ProductContext";
import { useSession } from "../context/SessionContext";
import "../styles/cardProductSearch.css";
import start from "../assets/img/star.svg";

function CardSearchProduct({ product }) {
  const { addToFavorite, removeFromFavorite, getFavorites, favorite } =
    useProduct();
  const { isAuthenticated } = useSession();
  const [iconHeart, setIconHeart] = useState(false);

  const toggleHeart = () => {
    // e.preventDefault();
    setIconHeart((prevHeart) => !prevHeart);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        await getFavorites();
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    favorite.forEach((element) => {
      if (element.product_id == product._id) {
        setIconHeart(true);
      }
    });
  }, [favorite, product._id]);

  return (
    <div className="card-search-product-general">
      <Link to={`/overview/${product._id}`}>
        <div className="grid container--image-search margin-general">
          <div className="image-search-product">
            <img className="size-image-product" src={product.image} alt="" />
          </div>
          <div className="description-product-search">
            <div className="text-search-descrition ">
              <h2 className="product-search-title">{product.name}</h2>

              <div className="button-love-search">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleHeart();
                    iconHeart
                      ? removeFromFavorite(product._id)
                      : addToFavorite(product);
                  }}
                >
                  <box-icon
                    type={iconHeart ? "solid" : "regular"}
                    name="heart"
                  ></box-icon>
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

        <hr />
      </Link>
    </div>
  );
}

export default CardSearchProduct;
