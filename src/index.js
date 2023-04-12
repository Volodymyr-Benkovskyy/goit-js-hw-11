import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchApi } from './fetch-api.js';
import { markUp } from './markUp.js';
const per_page = 40;
const btnSubmit = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');

const fetchApiInstance = new fetchApi();

const searchSubmit = async event => {
  event.preventDefault();

  const { target: formEl } = event;

  gallery.innerHTML = '';
  fetchApiInstance.query = formEl.searchQuery.value;
  fetchApiInstance.page = 1;

  if (!fetchApiInstance.query) {
    btnLoad.classList.add('is-hidden');
    return;
  }

  try {
    const response = await fetchApiInstance.fetchPhotosByQuery();
    const { data } = response;
    console.log(data);

    if (data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gallery.innerHTML = '';
      btnLoad.classList.add('is-hidden');
      return;
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images`);
      gallery.insertAdjacentHTML('beforeend', markUp(data.hits));
      const lightbox = new SimpleLightbox('.photo-card a', {
        captionsData: 'alt',
        captionPosition: 'buttom',
        captionDelay: 250,
      });
      lightbox.refresh();
      btnLoad.classList.remove('is-hidden');
    }
  } catch (error) {
    Notify.failure(error);
  }
};

btnSubmit.addEventListener('submit', searchSubmit);

const clickBtnLoad = async event => {
  fetchApiInstance.page += 1;

  try {
    const response = await fetchApiInstance.fetchPhotosByQuery();

    const { data } = response;

    gallery.insertAdjacentHTML('beforeend', markUp(data.hits));
    const lightbox = new SimpleLightbox('.photo-card a', {
      captionsData: 'alt',
      captionPosition: 'buttom',
      captionDelay: 250,
    });
    lightbox.refresh();
    btnLoad.classList.remove('is-hidden');

    if (fetchApiInstance.page * per_page >= data.totalHits) {
      btnLoad.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
};
btnLoad.addEventListener('click', clickBtnLoad);
