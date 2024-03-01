import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {useUser} from '../context/UserContext'

import { getProductsRequest, getProductRequest} from "../api/product";
import { 
    createPayRequest,
    sendCartToServerRequest, 
    getProductsCartRequest,
    deleteProductCartRequest,
    deleteAllProductsCartRequest
    
 } from "../api/payment";


export const ProductContext = createContext()

//creacion de la funcion para poder entrar al contexto o las funciones de autenticacion
export const useProduct = () => {
    const context = useContext(ProductContext)

    if (!context) {
        throw new Error('useProduct debe utilizarse dentro de un Productprovider')
    }

    return context
}

// ... (importaciones y código existente)

export const ProductProvider = ({ children }) => {
    const {isAuthenticated, profile} = useUser()
    
    const [cartProducts, setCartProducts] = useState([])
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate()

    

    const getProducts = async () => {
        try {
            
            const res = await getProductsRequest();
            setProducts(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProduct = async (id) => {
        try {
            // const resCart = await getProductsCartRequest()
            // const dataCart = resCart.data.data
            // setCountProducts(dataCart.length)
            const res = await getProductRequest(id);
            console.log(res);
            setProduct(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async(productCart) => {
        console.log(isAuthenticated);

        if(isAuthenticated){
            console.log('test add to cart');
            if (cart.find(item => item._id === productCart._id)) {
                const productsCart = cart.map(item =>
                    item._id === productCart._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setCart([...productsCart]);  
            } else{
                let test = []
                // setCart([...cart, {...productCart, quantity: 1 }]);
                 test = [...cart, {...productCart, quantity: 1 }]
                 const res = await sendCartToServerRequest(test, profile._id)
                 console.log(res);
                 test = []
                console.log('test within');
            }
            setCountProducts(countProducts + 1);
            // setTotal(total + productCart.price);

    
            // send to server

            const res = await sendCartToServerRequest(cart, profile._id)
            console.log(res);

        }else{
            navigate('/login')
        }    
        
    };

    const consolidateCartProducts = (cartData) => {
        const consolidatedProducts = {};
    
        // Consolidate products based on product_id
        cartData.forEach(product => {
            const productId = product.product_id;
            
    
            if (consolidatedProducts[productId]) {
                // If product already exists, update quantity
                consolidatedProducts[productId].quantity += product.quantity;
            } else {
                // If product doesn't exist, add it to the consolidated list
                consolidatedProducts[productId] = { ...product };
            }
        });
    
        // Convert object back to array
        const consolidatedArray = Object.values(consolidatedProducts);
    
        return consolidatedArray;
    };

    const getProductsCart = async() => {
        try {
            console.log('entro test');
            const token = localStorage.getItem('token');

            const res = await getProductsCartRequest(token)
            console.log(res);
            const dataCart = res.data.data.carts
            const dataTotal = res.data.data.total
            setTotal(dataTotal)

            setCountProducts(dataCart.length)
            
            const consolidatedCart = consolidateCartProducts(dataCart);
            setCartProducts(consolidatedCart)

            
            
        } catch (error) {
            console.log(error);
        }
    }

    //delete product card
    const onDeleteProduct = async(idProduct) => {
    
        console.log(idProduct);
        
        const res = await deleteProductCartRequest(idProduct)
        console.log(res);
        getProductsCart()
    }

    //delete all products in the shopping cart
    const onCleanCart = async(cartProducts) => {
        

        const res = await deleteAllProductsCartRequest(cartProducts)
        console.log(res);
        getProductsCart()
    }

    const createPay = async(cartProducts) => {
     
        try {

            const res = await createPayRequest(cartProducts)
            const payUrl = res.data.url
            console.log(res);
            window.location.href = payUrl; 
        } catch (error) {
            console.error('Error obtaining the payment url', error);
        }
    }

    

    useEffect( () => {
        async function loadDataCart(){
            
                const token = localStorage.getItem('token');

    
                console.log('test load');
                const res = await getProductsCartRequest(token)
                const dataCart = res.data.data.carts
                setCountProducts(dataCart.length)
        }
        loadDataCart()
    },[])



    return (
        <ProductContext.Provider
            value={{
                products,
                product,
                cart,
                countProducts,
                total,
                cartProducts,
                getProducts,
                getProduct,
                addToCart,
                getProductsCart,
                onDeleteProduct,
                onCleanCart,
                createPay,
    
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
