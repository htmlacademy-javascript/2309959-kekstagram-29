import { showErrorMessage } from './messages.js';

const baseUrl = 'https://29.javascript.pages.academy/kekstagram';

const errorNode = document.getElementById('error');

const showError = (message) => {
  if (!errorNode) {
    return;
  }
  errorNode.classList.add('opened');
  errorNode.textContent = message;
  setTimeout(() => errorNode.classList.remove('opened'), 2000);
};

const callApi = (url, props, cb) => {
  if (!props) {
    props = {};
  }
  if (!props.method) {
    props.method = 'GET';
  }
  fetch(`${baseUrl}${url}`, props)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Неверный код ответа сервера: ${ response.status }`);
      }
      response.json()
        .then((json) => {
          cb(json);
        });
    })
    .catch((e) => {
      showError(`Ошибка соединения:${ e.message }`);
      showErrorMessage();
    });
};

export const api = {
  photo: {
    list: (cb) => callApi('/data', null, cb),
    add: (body, cb) => callApi('/', { method: 'POST', body }, cb),
  }
};

