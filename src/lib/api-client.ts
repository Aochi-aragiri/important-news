import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://important-news-api-production.up.railway.app',
});
