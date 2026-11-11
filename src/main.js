import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const toastOptions = {
  position: 'topRight',
  backgroundColor: '#ef4040',
  messageColor: '#fff',
  iconColor: '#fff',
  progressBarColor: '#b51b1b',
  maxWidth: 432,
};

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      ...toastOptions,
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          ...toastOptions,
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        message: `Something went wrong: ${error.message}`,
        ...toastOptions,
      });
    })
    .finally(() => {
      hideLoader();
    });
});
