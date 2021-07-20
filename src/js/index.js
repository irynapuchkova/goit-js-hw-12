import '../css/styles.css';
// import '../../node_modules/lodash.debounce/index';
var debounce = require('lodash.debounce');

import '../../node_modules/notiflix-react/dist/notiflix-react-1.4.0.css';
import Notiflix from '../../node_modules/notiflix-react/dist/notiflix-react-1.4.0'


import countriesListTpl from '../templates/countries_list.hbs';
import countryCardTpl from '../templates/country_info.hbs';

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.eu/rest/v2';
const OPTIONS = `name;capital;flag;population;languages`;


const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(handleInputInfo, DEBOUNCE_DELAY))

function handleInputInfo(e) {
  const inputContex = e.target.value.toLowerCase();

  fetchCountries(inputContex)
    .then(notifyInfoTooManyCountries)
    .then(renderCountryList)
    .then(renderCountryCard)
    .catch(notifyNoCountry)
}

function fetchCountries(name) {

  return fetch(`${BASE_URL}/name/${name}?fields=${OPTIONS}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
  }

function renderCountryList(countries) {

  countryInfo.innerHTML = ' ';

  if (countries.length > 1 && countries.length <= 10) {
    const markup = countriesListTpl(countries);
    countryList.insertAdjacentHTML('beforeend', markup)
  }
  return countries;
}

function renderCountryCard(countries) {

  if (countries.length === 1) {
    countryList.innerHTML = ' ';
    const markupCard = countryCardTpl(countries)

    countryInfo.innerHTML = markupCard;
  }
}

function notifyInfoTooManyCountries(countries) {

  countryList.innerHTML = ' ';

  if (countries.length > 10) {
    Notiflix.Notify.Info('Too many matches found. Please enter a more specific name.')  
  }
  return countries;
}

function notifyNoCountry(error, countries) {
  if ([] || !countries) {
    console.log(error);
    Notiflix.Notify.Failure('Oops, there is no country with that name');
    countryList.innerHTML = ' ';
    countryInfo.innerHTML = ' ';
  }
}