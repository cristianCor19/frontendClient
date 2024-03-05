import { useProduct } from "../context/ProductContext";

import CardSearchProduct from "../components/CardSearchProduct"

function ProductPage (){
    const {prodcuctSearch} = useProduct();
    return(
        <div className="margin-all-page">
            {prodcuctSearch.length === 0 ? (
                <p className="">No hay productos</p>

            ):(
                prodcuctSearch.map((product) =>(

                    <CardSearchProduct product={product} key={product._id}/>
                ))
                
            )}
        </div>
    )
}

export default ProductPage