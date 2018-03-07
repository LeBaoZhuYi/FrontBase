import axios from 'axios'

const http = axios.create({
    baseURL: '/',
    // timeout: 1000,
    headers: { Counter: '1.0' }
})

export default http
