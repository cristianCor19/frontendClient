import axios from './axios'
//
export const getProductsRequest = async() => axios.get(`/product/`)
export const getProductRequest = async(id) => axios.get(`/product/${id}`)
export const getProductsFavoriteRequest = async(token) => axios.get(`/product/get_favorites/${token}`)

export const sendFavoritesRequest = async(favorite, id) => axios.post(`/product/createFavorites/${id}`, favorite,);
export const removeFavoriteRequest = async(id) => axios.delete(`/product/delete_favorite/${id}`)

export const getSearchProductRequest = async(search) => axios.get(`/product/searchProducts?query=${search}` )

