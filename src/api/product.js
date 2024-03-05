import axios from './axios'
//
export const getProductsRequest = async() => axios.get(`/product/` )
export const getProductRequest = async(id) => axios.get(`/product/${id}` )

export const getSearchProductRequest = async(search) => axios.get(`/product/searchProducts?query=${search}` )

