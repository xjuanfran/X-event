import axios from "axios"

const local= "http://localhost:3000";
const render = "https://x-event.onrender.com";

const API = local;
const APICLOUDINARY = "https://api.cloudinary.com/v1_1/dmvpidbrt/image/upload"

export const registerRequest = (user) => axios.post(`${API}/user`, user)
export const loginRequest = (user) => axios.post(`${API}/auth/login`, user)   

// Request to Cloudinary
export const reqCloudinary= (FormData) => axios.post(`${APICLOUDINARY}`, FormData)
