import axios from "axios";

const API = "https://x-event.onrender.com";

export const getActivities = () => axios.get(`${API}/activity`);
export const getActivity = (id) => axios.get(`${API}/activity/${id}`);
export const createActivityRequest = (activity) => axios.post(`${API}/activity`, activity);
export const updateActivity = (activity) => axios.patch(`${API}/activity/${activity.id}`, activity);
export const deleteActivity = (id) => axios.patch(`${API}/activity/logic-delete/${id}`);