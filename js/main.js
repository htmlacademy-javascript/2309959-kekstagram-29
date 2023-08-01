
import { onSocialCommentsLoader, closeBigPictureModal } from './modal.js';

import { startUpload, sendPhoto } from './newForm.js';

import { api } from './api.js';

import { initGallery } from './gallery.js';

api.photo.list((photos) => {
  initGallery.setPhotos(photos);
});

startUpload();

sendPhoto();

onSocialCommentsLoader(); //загружает комментарии

closeBigPictureModal(); //закрывает большую модалку


