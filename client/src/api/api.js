import axios from 'axios';
import { ORIGIN } from '../config';
import { bodyToForm } from './bodyToForm';

export const api = axios.create({
  baseURL: ORIGIN + 'api/',
});

export const API = {
  auth: {
    getUser: () => api.get('auth/user', {}),
    register: (body) => {
      const form = bodyToForm(body);
      return api.post('auth/register', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    login: (body) => api.post('auth/login', body),
    logout: () => api.delete('auth/logout'),
  },
  posts: {
    getAllPosts: ({ page, limit }) =>
      api.get(`posts?page=${page}&limit=${limit}`),
    getPost: (id) => api.get('posts/' + id),
    searchPosts: (phrase, { page, limit }) =>
      api.get('posts/search/' + phrase + `?page=${page}&limit=${limit}`),
    addPost: (body) => {
      const form = bodyToForm(body);
      return api.post('posts/', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    editPost: (id, body) => {
      const form = bodyToForm(body);
      return api.patch('posts/' + id, form);
    },
    deletePost: (id) => api.delete('posts/' + id),
  },
  users: {
    getUser: (id) => api.get('users/' + id),
  },
};
