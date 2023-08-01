const hashtagsSymbols = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagsMin = 5;
const hashtagsMax = 140;
const hashtagMaxError = () => 'Слишком много хэштегов!';
const hashtagUniquenessError = () => 'Два одинаковых хэштэга!';
const hashtagSymbolsError = () => 'Исправьте хэштег, пожалуйста!';
const textError = () => 'Комментарий не может быть длиннее 140 символов!';

const validateHashtag = (value) => value.split(/\s+/).length <= hashtagsMin;
const validateTextarea = (value) => value.length <= hashtagsMax;

const validateHashtagSymbols = (value) => {
  const hashtags = value.split(/\s+/);
  return !value.length || hashtags.every((hashtag) => hashtagsSymbols.test(hashtag));
};

const hashtagsKeydown = (evt) => evt.stopPropagation();
const textareaKeydown = (evt) => evt.stopPropagation();

const validateUniqueness = (value) => {
  const hashtags = value.toLowerCase()
    .split(/\s+/)
    .map((hashtag) => hashtag.toLowerCase());

  return hashtags.length === new Set(hashtags).size;
};

const uploadFormValidation = (form) => {
  const inputHashtags = form.querySelector('.text__hashtags');
  const textarea = form.querySelector('.text__description');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
  }, true);

  pristine.addValidator(inputHashtags, validateHashtag, hashtagMaxError);
  pristine.addValidator(inputHashtags, validateUniqueness, hashtagUniquenessError);
  pristine.addValidator(inputHashtags, validateHashtagSymbols , hashtagSymbolsError);
  pristine.addValidator(textarea, validateTextarea, textError);

  inputHashtags.addEventListener('keydown', hashtagsKeydown);
  textarea.addEventListener('keydown', textareaKeydown);

  return {
    validate: () => pristine.validate(inputHashtags, textarea),
    reset: pristine.reset,
  };
};

export {uploadFormValidation};
