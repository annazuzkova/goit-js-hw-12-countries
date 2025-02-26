import { fetchCountries } from './api/fetchCountries';
import Handlebars from 'handlebars';
import country from 'bundle-text:./templates/country.hbs';
import { _debounce } from 'lodash';

const input = document.querySelector('.input');
const countryFindlist = document.querySelector('.country-findlist');
const countryContainer = document.querySelector('.country-container');
const renderCountry = () => {
  const foundCountryesPromise = fetchCountries(input.value);
  foundCountryesPromise.then(findCountries => {
    if (findCountries.length > 10) {
      alert('Введіть більше інформаціі');
      return;
    }
    if (findCountries.length < 10 && findCountries.length > 2) {
      for (const findCountry of findCountries) {
        const liCountry = `<li>${findCountry.name.common}</li>`;
        countryFindlist.insertAdjacentHTML('beforeend', liCountry);
      }
      return;
    }
    if (findCountries.length === 1) {
      countryFindlist.innerHTML = '';
      const findOneCountry = findCountries[0];

      const templateEvents = Handlebars.compile(country); // Компілюємо шаблон Handlebars

      const html = templateEvents(findOneCountry); // Генеруємо HTML з подій

      countryContainer.innerHTML = html;
      const languagesList = document.querySelector('.languages-list');
      const languages = Object.values(findOneCountry.languages);
      for (const language of languages) {
        const liLanguage = `<li>${language}</li>`;
        languagesList.insertAdjacentHTML('beforeend', liLanguage);
      }
      return;
    }
  });
};

input.addEventListener('change', _.debounce(renderCountry, 5000));
