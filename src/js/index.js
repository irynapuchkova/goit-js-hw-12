import '../css/styles.css'
import '../../node_modules/notiflix-react/dist/notiflix-react-1.4.0.css'

import Notiflix from '../../node_modules/notiflix-react/dist/notiflix-react-1.4.0'
import { debounce } from 'lodash'

import API from './fetchCountries'
import getRefs from './get_refs'
import countriesListTpl from '../templates/countries_list.hbs'
import countryCardTpl from '../templates/country_info.hbs' 


const DEBOUNCE_DELAY = 300;
const refs = getRefs();


refs.input.addEventListener('input', debounce(handleInputInfo, DEBOUNCE_DELAY))

function handleInputInfo(e) {
  const inputContex = e.target.value.toLowerCase();

  API.fetchCountries(inputContex)
    .then(notifyInfoTooManyCountries)
    .then(renderCountryList)
    .then(renderCountryCard)
    .catch(notifyNoCountry)
}


function renderCountryList(countries) {

  refs.countryInfo.innerHTML = ' ';

  if (countries.length > 1 && countries.length <= 10) {
    const markup = countriesListTpl(countries);
    refs.countryList.insertAdjacentHTML('beforeend', markup)
  }
  return countries;
}

function renderCountryCard(countries) {

  if (countries.length === 1) {
    refs.countryList.innerHTML = ' ';
    const markupCard = countryCardTpl(countries)
    
    const languages = countries[0].languages.map(language => language.name).join(', ')
    refs.countryInfo.innerHTML = markupCard;
    refs.countryInfo.insertAdjacentHTML('beforeend', `<p><span class="country-info__subtitle">Languages</span>: ${languages} </p>`)
  }
}

function notifyInfoTooManyCountries(countries) {

  refs.countryList.innerHTML = ' ';

  if (countries.length > 10) {
    Notiflix.Notify.Info('Too many matches found. Please enter a more specific name.')  
  }
  return countries;
}

function notifyNoCountry(error, countries) {
  if ([] || !countries) {
    console.log(error);
    Notiflix.Notify.Failure('Oops, there is no country with that name');
    refs.countryList.innerHTML = ' ';
    refs.countryInfo.innerHTML = ' ';
  }
}