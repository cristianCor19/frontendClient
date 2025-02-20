import axios from './axios'
//
export const getProductsRequest = async(category) => axios.get(`/product?category=${category}`)
export const getProductRequest = async(id) => axios.get(`/product/${id}`)
export const getProductsFavoriteRequest = async(token) => axios.get(`/product/get_favorites/${token}`)

export const sendFavoritesRequest = async(favorite, id) => axios.post(`/product/createFavorites/${id}`, favorite,);
export const removeFavoriteRequest = async(idProduct, idUser) => axios.delete(`/product/delete_favorite/${idProduct}/${idUser}`)

export const getSearchProductRequest = async(search) => axios.get(`/product/searchProducts?query=${search}` )

