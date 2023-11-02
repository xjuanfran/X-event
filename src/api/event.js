import axios from "axios";

export const API = "http://localhost:3000";

export const getEvents = () => axios.get(`${API}/event`);
export const getEvent = (id) => axios.get(`${API}/event/${id}`);
export const createEvent = (event) => axios.post(`${API}/event`, event);
export const updateEvent = (event) => axios.patch(`${API}/event/${event.id}`, event);
export const deleteEvent = (id) => axios.patch(`${API}/event/logic-delete/${id}`);