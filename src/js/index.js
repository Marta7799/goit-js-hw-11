import Notiflix from 'notiflix';
import { images } from './images';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const input = document.querySelector('input[name="searchQuery"]');
const perPage = 40;
let key = '';
let page = 1;

const lightbox = new simpleLightbox('.gallery a');

form.addEventListener('submit', searchImages);
loadMore.addEventListener('click', getMoreImages);

function clear() {
  gallery.innerHTML = '';
}

function searchImages(e) {
  e.preventDefault();
  key = e.currentTarget.searchQuery.value.trim();
  loadMore.classList.add('is-hidden');
  clear();
  input.value = '';
  if (!key) {
    Notiflix.Notify.info('Search images...');
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
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        if (data.totalHits > perPage) {
          loadMore.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

function getMoreImages() {
  page += 1;
  images(key, page, perPage)
    .then(({ data }) => {
      getGallery(data.hits);
      lightbox.refresh();
      const allPages = Math.ceil(data.hits / perPage);
      if (page > allPages) {
        loadMore.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

function getGallery(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card"> <a href="${largeImageURL}">
                <img src = "${webformatURL}" alt = "${tags}" loading = "lazy" title="${tags}"/></a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>${downloads}
                        </p>
                    </div>
</div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

if (gallery.firstElementChild) {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
