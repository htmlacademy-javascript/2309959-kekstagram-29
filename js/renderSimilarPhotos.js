const littlePicturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const littlePicturesContainer = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLicesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
//const bigPictureCommentsList = bigPicture.querySelector('.social__comments');

const openBigPictureModal = (url, description, likes, comments) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureDescription.textContent = description;
  bigPictureLicesCount.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
};

const closeBigPictureModal = () => {
  const closeButton = document.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });
};
closeBigPictureModal();

const createLittlePictures = ({ comments, description, likes, url }) => {
  const photoElement = littlePicturesTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;

  photoElement.addEventListener('click', () => openBigPictureModal(url, description, likes, comments));

  return photoElement;
};

const renderLittlePictures = (littlePictures) => {
  const littlePicturesListFragment = document.createDocumentFragment();
  littlePictures.forEach((picture) => {
    const photoElement = createLittlePictures(picture);
    littlePicturesListFragment.append(photoElement);
  });
  littlePicturesContainer.append(littlePicturesListFragment);
};

export {renderLittlePictures};
