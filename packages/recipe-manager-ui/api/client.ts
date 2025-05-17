import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1000
})

export default axiosClient