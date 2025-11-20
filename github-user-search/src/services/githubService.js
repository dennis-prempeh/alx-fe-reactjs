import axios from 'axios';

const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: token ? { Authorization: `token ${token}` } : {}
});

export const fetchUserData = async (username) => {
  return api.get(`/users/${username}`);
};

export const searchUsers = async (query, page = 1, perPage = 30) => {
  return api.get('/search/users', {
    params: {
      q: query,
      page,
      per_page: perPage
    }
  });
};

export default api;