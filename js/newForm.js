import { uploadFormValidation } from './validation.js';

import { initSliderEffectChange, resetSlider } from './effects.js';

import { initScale, resetScale } from './skaling.js';

import { api } from './api.js';

import { showSuccessMessage, hideMessage, isShownMessage } from './messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFileInput = document.getElementById('upload-file');
const uploadPreview = document.querySelector('.img-upload__preview img');//это элемент Превьюхи
const uploadForm = document.getElementById('upload-select-image');//эту форму надо чекать в Пристин
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelBtn = document.getElementById('upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const uploadSubmitBtn = document.getElementById('upload-submit');

const makeformValidation = uploadFormValidation(uploadForm);

const onUploadCancelBtnClick = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset(); // сбрасываю данные формы
  resetScale(); // сбрасываю кнопку увеличения/уменьшения фото
  resetSlider(); // сбрасываю сладер эффектов на фото
  makeformValidation.reset(); // сбрасываю валидатор
  document.removeEventListener('keydown', onDocumentKeydown); // закрываю форму, удаляю обработчик по кнопке
  uploadCancelBtn.removeEventListener('click', onUploadCancelBtnClick); // закрываю форму, удаляю обработчик по клику
};

const isTextInputsFocused = () =>
  document.activeElement === textHashtags ||
  document.activeElement === textDescription;


function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextInputsFocused()) {
    evt.preventDefault();
    if (isShownMessage()) {
      hideMessage();
    } else {
      onUploadCancelBtnClick();
    }
  }
}

export const startUpload = () => uploadFileInput.addEventListener('change', (e) => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initSliderEffectChange();
  initScale();

  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);

  const file = e.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
  }
  makeformValidation.validate();
});


//Загружаем свою фотку
export const sendPhoto = () => uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const isValid = makeformValidation.validate();
  if (!isValid) {
    return;
  }
  uploadSubmitBtn.disabled = true;
  api.photo.add(new FormData(uploadForm), () => {
    uploadSubmitBtn.disabled = false;
    showSuccessMessage();
    makeformValidation.reset();
    onUploadCancelBtnClick();
  });
});
