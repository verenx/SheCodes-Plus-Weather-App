function refreshWeatherData(response) {
  console.log(response);
  let temperatureValue = document.querySelector("#weather-value");
  let currentTemperature = Math.round(response.data.temperature.current);
  temperatureValue.innerHTML = currentTemperature;
  let currentCityHeading = document.querySelector("#heading-current-city");
  currentCityHeading.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "bbb7o8acc1a3c8e9f87003f9494b2cct";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function changeCity(event) {
  event.preventDefault();
  let searchFormElement = document.querySelector("#search-input");
  searchCity(searchFormElement.value);
}

let searchFormButton = document.querySelector("#search-button");
searchFormButton.addEventListener("click", changeCity);

searchCity("Vienna");
