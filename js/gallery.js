import { openBigPictureModal } from './modal.js';
import { api } from './api.js';
import { showSuccessMessage } from './messages.js';

const smallPicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const smallPicturesContainer = document.querySelector('.pictures');

const createsmallPictures = ({ comments, description, likes, url }) => {
  const photoElement = smallPicturesTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;

  photoElement.addEventListener('click', () => openBigPictureModal(url, description, likes, comments));

  return photoElement;
};

const uploadBtn = document.getElementById('upload-file');
const uploadPreview = document.querySelector('.img-upload__preview img');//это элемент Превьюхи
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

uploadBtn.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
  }
});

//Загружаем свою фотку
const uploadForm = document.getElementById('upload-select-image');

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  api.photo.add(new FormData(uploadForm), () => {
    showSuccessMessage();
  });
});


export const gallery = new function () {
  let photos = [];
  let filterOption = null;

  const sortRandomly = () => Math.random() - 0.5;
  const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
  const pictureCount = 10;
  const filterOptions = {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed',
  };
  const filterElement = document.querySelector('.img-filters');

  // устанавливаем фотки галереи
  this.setPhotos = function (_photos) {
    photos = _photos;
    this.render();
  };

  // устанавливаем текущую опцию фильтра
  this.setFilterOption = function (_filterOption) {
    filterOption = _filterOption;
    this.render();
  };

  // применяем фильтр
  this.applyFilter = function () {
    switch(filterOption) {
      case filterOptions.RANDOM:
        return [...photos].sort(sortRandomly).slice(0, pictureCount);
      case filterOptions.DISCUSSED:
        return [...photos].sort(sortByComments);
      default:
        return [...photos];
    }
  };

  // отрисовываем галерею
  this.render = function () {
    const smallPictures = this.applyFilter();
    // очистка
    const photoElems = document.querySelectorAll('.picture');
    photoElems.forEach((elem) => elem.remove());
    // отрисовка
    const smallPicturesListFragment = document.createDocumentFragment();
    smallPictures.forEach((picture) => {
      const photoElement = createsmallPictures(picture);
      smallPicturesListFragment.append(photoElement);
    });
    smallPicturesContainer.append(smallPicturesListFragment);
  };

  // инициализация событий фильтра
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === filterOption) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    this.setFilterOption(clickedButton.id);
  });
};

