
import { createPhotoElementList } from './createPhoto.js'

export { renderCommentList, onSocialCommentsLoader, createModalComments } from './modal.js'
export { renderLittlePictures, closeBigPictureModal, openBigPictureModal } from './modal.js'

openBigPictureModal();

closeBigPictureModal();

renderLittlePictures(createPhotoElementList(25));

renderCommentList();

onSocialCommentsLoader();

