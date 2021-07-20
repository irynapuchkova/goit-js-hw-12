// export default fetchCountries;
// import flagAndCountry from '../templates/flagAndCountry.hbs'


// const countryList = document.querySelector('.country-list');

// function fetchCountries() {

// return fetch(`https://restcountries.eu/rest/v2/name/{name}`)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status)
//     }
//     // return response.json()
//     console.log(response.json());
//   })
//   .then(country => {
//     console.log(country);
//     // const markup = flagAndCountry(country);
//     // countryList.insertAdjacentHTML('beforeend', markup)
//   })
//   .catch(error => console.log(error))

// }

// fetchCountries('Ukraine')