import axios from "axios"

const API = "https://x-event.onrender.com"
const APICLOUDINARY = "https://api.cloudinary.com/v1_1/dmvpidbrt/image/upload"
const APICLOUDINARYDELETE = "https://api.cloudinary.com/v1_1/dmvpidbrt/image/destroy"

export const registerRequest = (user) => axios.post(`${API}/user`, user)
export const loginRequest = (user) => axios.post(`${API}/auth/login`, user)   

// Request to Cloudinary
export const reqCloudinary= (FormData) => axios.post(`${APICLOUDINARY}`, FormData)
export const deleteCloudinary = (urlPhoto) => axios.delete(`${APICLOUDINARYDELETE}`, urlPhoto)
