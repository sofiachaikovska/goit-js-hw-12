import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let searchQuery = '';
const perPage = 40;

const options = {
  captionsData: 'alt',
  captionsDelay: 250,
};
const lightbox = new SimpleLightbox('.image-card', options);

const form = document.querySelector('form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

hideLoader();
hideLoadMoreButton();

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  clearImages();

  searchQuery = document.querySelector('input').value.trim();
  if (searchQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }
  showLoader();
  currentPage = 1;
  try {
    const data = await searchImages(searchQuery, currentPage);
    hideLoader();
    if (data.hits.length > 0) {
      appendImages(data.hits);
      lightbox.refresh();
      if (data.totalHits <= perPage) {
        hideLoadMoreButton();
      } else {
        showLoadMoreButton();
      }
    } else {
      showNoResultsMessage();
      clearImages();
      hideLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error.message);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images. Please try again.',
    });
  }
});

loadMoreButton.addEventListener('click', async function () {
  showLoader();
  currentPage++;
  try {
    const data = await searchImages(searchQuery, currentPage);
    hideLoader();
    if (data.totalHits > 0) {
      appendImages(data.hits);
      lightbox.refresh();
      scrollToNextGroup();
      if (data.totalHits <= currentPage * perPage) {
        hideLoadMoreButton();
        showEndMessage();
      }
    } else {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching more images:', error.message);
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching more images. Please try again.',
    });
  }
});

async function searchImages(query, page) {
  const apiKey = '42011600-6d993b5d4f0ba2a9af1a5ffd0';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&pretty=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

function appendImages(images) {
  const imageMarkup = images
    .map(
      image => `
        <li class="image-item">
          <a href="${image.largeImageURL}" class="image-card">
            <div class="image-container">
              <img src="${image.webformatURL}" alt="${image.tags}">
            </div>
            <div class="image-info">
              <span><span class="label">Likes</span> ${image.likes}</span>
              <span><span class="label">Views</span> ${image.views}</span>
              <span><span class="label">Comments</span> ${image.comments}</span>
              <span><span class="label">Downloads</span> ${image.downloads}</span>
            </div>
          </a>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', imageMarkup);
}

function clearImages() {
  gallery.innerHTML = '';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showNoResultsMessage() {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}

function showLoadMoreButton() {
  loadMoreButton.style.visibility = 'visible';
}

function hideLoadMoreButton() {
  loadMoreButton.style.visibility = 'hidden';
}

function showEndMessage() {
  iziToast.info({
    title: 'Info',
    message: 'We are sorry, but you have reached the end of search results.',
  });
}

function scrollToNextGroup() {
  const cardHeight = document
    .querySelector('.image-card')
    .getBoundingClientRect().height;

  const numberOfCardsToScroll = 4;

  const currentPosition = window.scrollY;
  const targetPosition = currentPosition + cardHeight * numberOfCardsToScroll;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}
