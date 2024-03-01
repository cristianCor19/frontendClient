import axios from "./axios";


export const getProductsCartRequest = async(token) => axios.get(`/payment/obtainAllProductsCart/${token}`)

export const sendCartToServerRequest = async(cart, id) => axios.post(`/payment/createCart/${id}`, cart,);


export const deleteProductCartRequest = async(idProductCart) => axios.delete(`/payment/deleteProductCart/${idProductCart}`)

export const deleteAllProductsCartRequest = async(cartProducts) => axios.post(`/payment/deleteAllProductsCart`, cartProducts)


export const createPayRequest = async(cart) => axios.post(`/payment/create-checkout-sesion`,cart)


export const successRequest = async() => axios.get(`/payment/success`)