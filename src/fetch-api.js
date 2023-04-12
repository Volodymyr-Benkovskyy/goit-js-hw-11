import axios from 'axios';

export class fetchApi {
  static BASE_URL = 'https://pixabay.com';
  static API_KEY = '35306708-5a7b39f001c145ac7e8eb2c22';

  constructor() {
    this.page = 1;
    this.query = null;
    this.per_page = 40;
  }

  fetchPhotosByQuery() {
    const searchParams = new URLSearchParams({
      key: fetchApi.API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    });

    return axios.get(`${fetchApi.BASE_URL}/api/?${searchParams}`);
  }
}
