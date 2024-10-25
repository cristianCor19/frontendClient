import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";

import '../styles/cartProduct.css'


function CartPage(){
    const {cartProducts, total,  createPay, onCleanCart, getProductsCart, onDeleteProduct} = useProduct();
    
    useEffect(() => {
        const fetchData = async () => {
          await getProductsCart();
        };
        fetchData();
      }, []);

    if (cartProducts.length === 0) return (<h1>No hay productos</h1>);
    return (
        <div className="margin-all-page">
            <div className=" mt-3">
                <h1 className="text-xl mb-2 text-center ">Tus productos</h1>
                <div className="p-5  margin-general-Cart">
                    <div className="overflow-auto rounded-lg shadow ">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Nombre</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Precio</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Cantidad</th>
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Imagen</th>
                                    {/* <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Subtotal</th> */}
                                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {cartProducts.map((product) => (
                                    <tr className="bg-white" key={product._id}>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <a href="#" className="font-bold text-blue-500 hover:underline">{product.name}</a>
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">
                                            {product.price}
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">
                                            <span className="p-3 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{product.quantity}</span>
                                        </td>
                                        <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap"><img src={product.image} alt="" /></td>
                                    

                                        {/* <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">{}</td> */}
                                        <td className="">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 button-delete-one"
                                            onClick={()=> onDeleteProduct(product.product_id)}
                                            >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>

                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-gray-50 container-page-cart ">
                        <p className="text-center font-bold mt-1">Resumen de compra</p>
                        <div className="flex mt-3 ml-3">
                            
                            <h2>Total a pagar</h2>
                            <p className="description-total-cart">${total}</p>
                        </div>
                        <button className="bg-red-500 button-deleteProducts-cart hidden sm:block" onClick={() =>{
                            onCleanCart(cartProducts)
                        }}>Vaciar Carrito
                        </button>
                        <br />
                        <button className="button-page-cart " onClick={() =>{
                            createPay(cartProducts)
                        }}>Continuar Compra
                        </button>   
                    </div>

                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {cartProducts.map((product) => (

                    
                        <div className="bg-white space-y-3 p-4 rounded-lg shadow" key={product._id}>
                            <div className="flex items-center space-x-2 text-sm">
                            
                                <div>
                                    <a href="#" className="text-blue-500 font-bold hover:underline">#1000</a>
                                </div>
                                <div className="text-gray-500"></div>
                                <div>
                                    <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{product.name}</span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-700">
                                <img src={product.image} alt="" />
                            </div>
                            <div className="text-sm font-medium text-black text-center">
                                Precio: {product.price}
                            </div>
                        </div>
                    ))
                    }
                    </div> */}

                </div>
            
            </div>
        </div>
    )
    
}


export default CartPage