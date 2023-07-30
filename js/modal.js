
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLicesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

const COMMENTS_PER_PORTION = 5;

let commentsShown = 0;

let commentsList = [];

const commentsContainer = document.querySelector('.social__comments');

const modalCommentsTemplate = document.querySelector('.social__comment');

const createModalComments = ({ avatar, message, name }) => {
  const commentElement = modalCommentsTemplate.cloneNode(true);
  commentsContainer.innerHTML = '';

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderCommentList = function () {

  // eslint-disable-next-line no-unused-expressions
  commentsList.length - commentsShown < COMMENTS_PER_PORTION ?
    (commentsShown += commentsList.length - commentsShown) :
    (commentsShown += COMMENTS_PER_PORTION);

  // eslint-disable-next-line no-unused-expressions
  commentsShown >= commentsList.length ?
    (socialCommentsLoader.classList.add('hidden')) :
    (socialCommentsLoader.classList.remove('hidden'));

  bigPicture.querySelector('.comments-count-begin').textContent = commentsShown;
  const commentsDocumentFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createModalComments(commentsList[i]);
    commentsDocumentFragment.append(commentElement);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsDocumentFragment);

};
renderCommentList();

const onSocialCommentsLoader = () => socialCommentsLoader.addEventListener('click', () => renderCommentList());


const openBigPictureModal = (url, description, likes, comments) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureDescription.textContent = description;
  bigPictureLicesCount.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
  document.body.classList.add('modal-open');
  commentsList = comments;
  commentsShown = 0;
  renderCommentList();
};

const closeBigPictureModal = () => {
  const closeButton = document.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }

  });
};

export { renderCommentList, onSocialCommentsLoader, createModalComments };
export { closeBigPictureModal, openBigPictureModal };
