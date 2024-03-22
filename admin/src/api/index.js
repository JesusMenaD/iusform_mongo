import axios from 'axios'

const URI = 'http://localhost:3000/api/'
// const URI = 'https://iusform.zeivor.net/api/'

// http://82.180.173.24:5000/login

export const apiAuth = (headers = {
  // 'Content-Type': 'application/json',
  // 'Content-Type': 'multipart/form-data'
}) => axios.create({
  baseURL: URI,
  headers: {
    ...headers
  }
})

export const URI_API = URI
