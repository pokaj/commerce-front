import axios from "axios";
const baseUrl = 'http://localhost:8000/api/v1/auth'


export const Register = async (username, email, password) => {
    const {data} = await axios.post(`${baseUrl}/signup`, {username, email, password})
    return data
}

export const SignIn = async (email, password) => {
    const {data} = await axios.post(`${baseUrl}/login`, {email, password})
    return data
}
