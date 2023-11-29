import axios from "axios";

const local= "http://localhost:3000";
const render = "https://x-event.onrender.com";

const API = render;

export const getEvents = () => axios.get(`${API}/event`);
export const getEvent = (id) => axios.get(`${API}/event/${id}`);
export const getEventCreator = (id) => axios.get(`${API}/event/byUser/${id}`);
export const createEventRequest = (event) => axios.post(`${API}/event`, event);
export const updateEvent = (event) => axios.patch(`${API}/event/${event.id}`, event);
export const deleteEvent = (id) => axios.patch(`${API}/event/logic-delete/${id}`);