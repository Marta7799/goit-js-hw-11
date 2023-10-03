import Notiflix from 'notiflix';
import { images } from './images';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const lightbox = new simpleLightbox('.gallery a');
