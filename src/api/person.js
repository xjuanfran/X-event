import axios from "axios"

const API = "https://x-event.onrender.com"

export const getPersonNickName = (nickname) => axios.get(`${API}/user/byNickName/${nickname}`)