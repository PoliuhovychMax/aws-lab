import api from "./axios";
import { API_URL } from '../api';

export const getUsers = () => api.get(`${API_URL}/users`);
