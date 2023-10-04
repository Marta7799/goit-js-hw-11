import Notiflix from 'notiflix';
import { images } from './images';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const lightbox = new simpleLightbox('.gallery a');

function clear() {
  gallery.innerHTML = '';
}

function searchImages(e) {
  e.preventDefault();
  key = e.currentTarget.searchKey.vaule.trim();
  loadMore.classList.add('is-hidden');
  clear();
  if (!key) {
    Notiflix.Notify.info('Search images');
    return;
  }
  images(key, page, perPage)
    .then(({ data }) => {
      if (!data.totalHits) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        getGallery(data.hits);
        lightbox.refresh();
        Notiflix.Notify.success('Hooray! We found ${data.totalHits} images.');
        if (data.totalHits > perPage) {
          loadMore.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}
