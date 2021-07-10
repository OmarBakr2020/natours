import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from "./login";
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.btn--login');
const signupForm = document.querySelector('.btn--signup')
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataBtn = document.querySelector('.btn--updateData');
const userPasswordBtn = document.querySelector('.btn--savePassword');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (signupForm) {
  signupForm.addEventListener('click', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener('click', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataBtn) {
  userDataBtn.addEventListener('click', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    form.append('photo', document.getElementById('photo').files[0]);
    
    updateSettings(form, 'data');
  });
}

if (userPasswordBtn) {
  userPasswordBtn.addEventListener('click', async e => {
    e.preventDefault();
    document.querySelector('.btn--savePassword').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.querySelector('.btn--savePassword').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if(bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...'
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  })
}
