import { useProduct } from "../context/ProductContext";
import { useEffect } from "react";



function CartPage(){
    const {cartProducts, total, createPay, onCleanCart, getProductsCart} = useProduct();
    
    useEffect(() => {
        const fetchData = async () => {
          await getProductsCart();
        };
        fetchData();
      }, []);

    if (cartProducts.length === 0) return (<h1>No hay productos</h1>);
    return (
        <div className="margin-all-page">
            
            <div className="p-5 bg-gray-100">
                <h1 className="text-xl mb-2">Your orders</h1>
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Nombre</th>
                                <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Precio</th>
                                <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Cantidad</th>
                                <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Imagen</th>
                                <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">Subtotal</th>
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
                                    <td className="w-10 p-3 text-sm text-gray-700 whitespace-nowrap">{}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
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
                </div>

                <div>Total a pagar {total}</div>
                <button className="bg-red-500" onClick={() =>{
                    onCleanCart(cartProducts)
                }}>Vaciar Carrito
                </button>
                <br />
                <button className="rounded-sm bg-blue-700" onClick={() =>{
                    createPay(cartProducts)
                }}>
                    Pay
                </button>
            </div>
        </div>
    )
    
}


export default CartPage