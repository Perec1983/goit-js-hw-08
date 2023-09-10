import throttle from 'lodash.throttle';  


const LOCALSTORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(inputData, 500));
formEl.addEventListener('submit', formSubmit);

let dataFormObj = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};
const { email, message } = formEl.elements;


function inputData() {
  dataFormObj = { email: email.value, message: message.value };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataFormObj));
}

function reloadForm() {
  if (dataFormObj) {
    email.value = dataFormObj.email || '';
    message.value = dataFormObj.message || '';
  }
}

reloadForm();

function formSubmit(event) {
  event.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  localStorage.removeItem(LOCALSTORAGE_KEY);
  event.currentTarget.reset();
  dataFormObj = {};
}
