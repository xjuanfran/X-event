import axios from "axios";

const local= "http://localhost:3000";
const render = "https://x-event.onrender.com";

const API = local;

export const getActivities = () => axios.get(`${API}/activity`);
export const getActivity = (id) => axios.get(`${API}/activity/${id}`);
export const getActivitiesByUser = (id) => axios.get(`${API}/activity/byRegistration/${id}`);
export const createActivityRequest = (activity) => axios.post(`${API}/activity`, activity);
export const updateActivity = (activity) => axios.patch(`${API}/activity/${activity.id}`, activity);
export const deleteActivity = (id) => axios.patch(`${API}/activity/logic-delete/${id}`);