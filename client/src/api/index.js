import axios from 'axios';

const ROOT_URL = axios.create({ baseURL: 'http://localhost:5000' });

ROOT_URL.interceptors.request.use((req) => {
  // adding token to each request so that the backend can verify if the user is logged in
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => ROOT_URL.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  ROOT_URL.get(
    `/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPost = (id) => ROOT_URL.get(`/posts/${id}`);
export const createPost = (newPost) => ROOT_URL.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>
  ROOT_URL.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => ROOT_URL.delete(`/posts/${id}`);
export const likePost = (id) => ROOT_URL.patch(`posts/${id}/likePost`);

export const signUp = (formData) => ROOT_URL.post('/user/signUp', formData);
export const signIn = (formData) => ROOT_URL.post('/user/signIn', formData);
