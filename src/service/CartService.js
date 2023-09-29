import axios from "axios";
const baseUrl = 'http://localhost:8000/api/v1/cart'


export const purchaseItem = async (user_id, product_id) => {
    const {data} = await axios.post(`${baseUrl}`, {user_id, product_id})
    return data
}


export const getCartItems = async (user_id) => {
    const {data} = await axios.get(`${baseUrl}/${user_id}`)
    return data
}


export const Checkout = async (user_id) => {
    const {data} = await axios.post(`${baseUrl}/checkout/${user_id}`)
    return data
}


export const RemoveFromCart = async (user_id, product_id) => {
    const {data} = await axios.post(`${baseUrl}/remove`, {user_id, product_id})
    return data
}
