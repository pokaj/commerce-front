import axios from "axios";

const baseUrl = 'http://localhost:8000/api/v1/product'

export const fetchProducts = async () => {
    const {data} = await axios.get(`${baseUrl}`)
    return data
}

export const fetchProduct = async (id) => {
    const {data} = await axios.get(`${baseUrl}/${id}`)
    return data
}
