const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const minusButtonElement = document.querySelector('.scale__control--smaller');
const plusButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onMinusButtonClick = () => {
  scaleImage (
    Math.max(parseInt(scaleInputElement.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onPlusButtonClick = () => {
  scaleImage (
    Math.min(parseInt(scaleInputElement.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

const initScale = () => {
  resetScale();
  minusButtonElement.addEventListener('click', onMinusButtonClick);
  plusButtonElement.addEventListener('click', onPlusButtonClick);
};

export { initScale, resetScale };
