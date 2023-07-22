
import { createPhotoElementList } from './createPhoto.js';

import {onSocialCommentsLoader, renderLittlePictures, closeBigPictureModal } from './modal.js';

import { closeimgUploadInput } from './uploadForm.js';

import { initScale, resetScale } from './skaling.js';

closeBigPictureModal();

onSocialCommentsLoader();

renderLittlePictures(createPhotoElementList(25));

//makeformValidation();

closeimgUploadInput();

initScale();

resetScale();


