import{DESCRIPTION_PHOTO, NAMES_OF_COMMENTATORS, MESSAGES_OF_COMMENTATORS} from 'data.js';
import{createUnicumId, getRandomArrayElement} from 'utile.js';

const licesCount = createUnicumId(15, 200);
const generatePhotoId = createUnicumId(1, 25);
const generateCommentatorId = createUnicumId(1, 25);
const generateAvatarId = createUnicumId(1, 6);
const SIMILAR_PHOTO_COUNT = 4;
const SIMILAR_COMMENTS_COUNT = 3;

const createComment = () => ({
  id: generateCommentatorId(),
  avatar: `img/avatar-${ generateAvatarId() }.svg`,
  message: getRandomArrayElement(MESSAGES_OF_COMMENTATORS),
  name: getRandomArrayElement(NAMES_OF_COMMENTATORS),
});

const similarComment = Array.from({length:SIMILAR_COMMENTS_COUNT}, createComment);

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${ generatePhotoId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTION_PHOTO),
  likes: licesCount(),
  comments: similarComment,
});

const createPictures = () => Array.from({length:SIMILAR_PHOTO_COUNT}, createPhoto);

createPictures();

