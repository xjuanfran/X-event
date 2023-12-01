import axios from "axios"

const local= "http://localhost:3000";
const render = "https://x-event.onrender.com";

const API = render;

export const getPersonNickName = (nickname) => axios.get(`${API}/user/byNickName/${nickname}`)