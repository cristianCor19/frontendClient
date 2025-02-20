import CardProduct from "../components/CardProduct";
import { useEffect, useState, useCallback } from "react";
import { useProduct } from "../context/ProductContext";

function PartesPcPage() {
  const { getProducts, products } = useProduct();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    await getProducts("Partes pc");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3">
        <p className="">Cargando productos...</p>
      </div>
    );

  return (
    <div className="grid  cols-main test-al margin-all-page">
      {products.length === 0 ? (
        <p className="">No hay productos</p>
      ) : (
        products.map((product) => (
          <CardProduct product={product} key={product._id} />
        ))
      )}
    </div>
  );
}

export default PartesPcPage;
