export const fetchCountries = searchQuery => {
  const url = `https://restcountries.com/v3.1/name/${searchQuery}`;
  return fetch(url)
    .then(response => response.json())
    .then(foundCountryes => foundCountryes);
};
//і ось тут я і зрозуміла що асинхронні функціі то чудова річ... але тоді ми ще не знали що це
