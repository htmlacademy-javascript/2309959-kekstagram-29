const hashtagsSymbols = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagsMin = 5;
const hashtagsMax = 140;
const showHashtagMaxError = () => 'Слишком много хэштегов!';
const showHashtagUniquenessError = () => 'Два одинаковых хэштэга!';
const showHashtagSymbolsError = () => 'Исправьте хэштег, пожалуйста!';
const showTextError = () => 'Комментарий не может быть длиннее 140 символов!';

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

  pristine.addValidator(inputHashtags, validateHashtag, showHashtagMaxError);
  pristine.addValidator(inputHashtags, validateUniqueness, showHashtagUniquenessError);
  pristine.addValidator(inputHashtags, validateHashtagSymbols , showHashtagSymbolsError);
  pristine.addValidator(textarea, validateTextarea, showTextError);

  inputHashtags.addEventListener('keydown', hashtagsKeydown);
  textarea.addEventListener('keydown', textareaKeydown);

  return {
    validate: () => pristine.validate(inputHashtags, textarea),
    reset: pristine.reset,
  };
};

export {uploadFormValidation};
