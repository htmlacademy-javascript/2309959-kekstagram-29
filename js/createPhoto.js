import { DESCRIPTION_PHOTO, NAMES_OF_COMMENTATORS, MESSAGES_OF_COMMENTATORS } from './data.js'

import { getRandomInteger, createUnicumId } from './util.js'


const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const licesCount = createUnicumId(15, 200);
const generatePhotoId = createUnicumId(1, 25);
const generatePhotoUrl = createUnicumId(1, 25);

const SIMILAR_COMMENTS_COUNT = getRandomInteger(1, 35);

const createComment = () => ({
  id: getRandomInteger(AVATAR_MIN_ID, AVATAR_MAX_ID),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
  message: getRandomArrayElement(MESSAGES_OF_COMMENTATORS),
  name: getRandomArrayElement(NAMES_OF_COMMENTATORS),
});

const similarComment = () => Array.from({length:SIMILAR_COMMENTS_COUNT}, createComment);


const createPhotoElement = () => ({
  id: generatePhotoId,
  url: `photos/${ generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION_PHOTO),
  likes: licesCount(),
  comments: similarComment(),
});

const createPhotoElementList = (count) => Array.from({length: count}, createPhotoElement);

export { createPhotoElementList, similarComment }