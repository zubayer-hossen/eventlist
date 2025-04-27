import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/events";

const getEvents = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const createEvent = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const deleteEvent = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const eventService = { getEvents, createEvent, deleteEvent };
export default eventService;
