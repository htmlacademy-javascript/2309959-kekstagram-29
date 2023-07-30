
import {onSocialCommentsLoader, closeBigPictureModal } from './modal.js';

import { closeimgUploadInput } from './uploadForm.js';

import { initScale, resetScale } from './skaling.js';

import {initSliderEffect, resetSlider} from './effects.js';

import { api } from './api.js';

import { gallery } from './gallery.js';

api.photo.list((photos) => {
  gallery.setPhotos(photos);
});


closeBigPictureModal(); //закрывает большую модалку

onSocialCommentsLoader(); //загружает комментарии

closeimgUploadInput(); //закрывает модальное окно загрузки фотографии пользователем

initScale(); //запускает увеличение фотографии в окне загрузки фотографии

resetScale(); //сбрасывает увеличение фотографии в окне загрузки фотографии

initSliderEffect(); //запускает Слайдер в окне загрузки фотографии

resetSlider(); //отменяет Слайдер в окне загрузки фотографии
