import { uploadFormValidation } from './validation.js';

import { resetScale } from './skaling.js';

const imgUploadForm = document.querySelector('#upload-select-image');

const imgUploadInput = document.querySelector('.img-upload__overlay');

const uploadFile = imgUploadForm.querySelector('#upload-file');

const uploadCancelButton = document.querySelector('#upload-cancel');

const textHashtags = document.querySelector('.text__hashtags');

const textDescription = document.querySelector('.text__description');

const closeimgUploadInput = () => {
  imgUploadInput.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.removeEventListener('click', closeimgUploadInput);
  imgUploadForm.reset();
  resetScale();
};

const openimgUploadInput = () => {
  imgUploadInput.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.addEventListener('click', closeimgUploadInput);

};

const uploadFileBegin = () => uploadFile.addEventListener('change', openimgUploadInput);
uploadFileBegin();

const isTextInputsFocused = () =>
  document.activeElement === textHashtags ||
  document.activeElement === textDescription;


function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextInputsFocused()) {
    evt.preventDefault();
    closeimgUploadInput();
  }
}

const makeformValidation = uploadFormValidation(imgUploadForm);

export {makeformValidation, closeimgUploadInput };
