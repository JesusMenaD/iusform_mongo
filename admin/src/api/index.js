import axios from 'axios'

const URI = 'http://localhost:3000/api/'

export const apiAuth = (headers = {
  // 'Content-Type': 'application/json',
  // 'Content-Type': 'multipart/form-data'
}) => axios.create({
  baseURL: URI,
  headers: {
    ...headers
  }
})
