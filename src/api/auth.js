import axios from "axios"

const API = "http://localhost:3000"
const APICLOUDINARY = "https://api.cloudinary.com/v1_1/dj48mc1gg/image/upload"

export const registerRequest = (user) => axios.post(`${API}/user`, user)   

// Request to Cloudinary
