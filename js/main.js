
import { onCommentsLoaderClick, closeBigPictureModal } from './modal.js';

import { startUpload, sendPhoto } from './newForm.js';

import { api } from './api.js';

import { initGallery } from './gallery.js';

api.photo.list((photos) => {
  initGallery.setPhotos(photos);
});

startUpload();

sendPhoto();

onCommentsLoaderClick(); //загружает комментарии

closeBigPictureModal(); //закрывает большую модалку


