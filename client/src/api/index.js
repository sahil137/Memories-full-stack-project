import axios from 'axios';

const ROOT_URL = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchPosts = () => ROOT_URL.get('/posts');
export const createPost = (newPost) => ROOT_URL.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>
  ROOT_URL.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => ROOT_URL.delete(`/posts/${id}`);
export const likePost = (id) => ROOT_URL.patch(`posts/${id}/likePost`);

export const signUp = (formData) => ROOT_URL.post('/user/signUp', formData);
export const signIn = (formData) => ROOT_URL.post('/user/signIn', formData);
