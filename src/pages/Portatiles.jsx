import CardProduct from "../components/CardProduct";
import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";

function Portatiles() {
  const { getProducts, products, getFavorites } = useProduct();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      setLoading(false);
    };
    fetchData();
  }, []);


  if (loading) return <div className="grid sm:grid-cols-2 md:grid-cols-3"><p className="">Cargando productos...</p></div>;
  
  const filteredProducts = products.filter((product) => product.type === "Portátiles");

  return (
    <div className="grid  cols-main test-al margin-all-page">
      {filteredProducts.length === 0 ? (
        <p className="">No hay productos</p>
      ) : (
        filteredProducts.map((product) => (
          
          <CardProduct product={product} key={product._id} />
        ))
      )}
    </div>
  );
}

export default Portatiles;
