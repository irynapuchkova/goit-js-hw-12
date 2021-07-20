export default {fetchCountries};

const BASE_URL = 'https://restcountries.eu/rest/v2';
const OPTIONS = `name;capital;flag;population;languages`;

export function fetchCountries(name) {

  return fetch(`${BASE_URL}/name/${name}?fields=${OPTIONS}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
  }