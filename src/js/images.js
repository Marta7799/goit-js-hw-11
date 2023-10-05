import axios from 'axios';

export { images };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const url = 'https://pixabay.com/api/';
const API_KEY = '39809012-794bb9f85c23fb448d6e12ec5';
// const perPage = 40;
// const page = 1;
// const key = '';

async function images(key, page, perPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${key}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
}
