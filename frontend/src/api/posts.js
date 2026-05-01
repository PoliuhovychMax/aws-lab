import api from "./axios";
import { API_URL } from '../api';

export const getPosts = () => api.get(`${API_URL}/posts`);

export const getPost = (id) => api.get(`${API_URL}/posts/${id}`);

export const createPost = (data) => api.post(`${API_URL}/posts`, data);

export const updatePost = (id, data) => api.put(`${API_URL}/posts/${id}`, data);

export const deletePost = (id) => api.delete(`${API_URL}/posts/${id}`);