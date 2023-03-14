import axios from 'axios';

const API = axios.create({
  baseURL: 'https://todo-kokofrut.netlify.app',
});

export default API;