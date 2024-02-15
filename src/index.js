function refreshWeatherData(response) {
  let temperatureValue = document.querySelector("#weather-value");
  let currentTemperature = Math.round(response.data.temperature.current);
  let currentCityHeading = document.querySelector("#heading-current-city");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let dayAndTime = document.querySelector("#day-and-time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-icon");

  temperatureValue.innerHTML = currentTemperature;
  currentCityHeading.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  dayAndTime.innerHTML = formatDate(date);
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  getForecast(response.data.city);
}

function getForecast(city) {
  let apiKey = "bbb7o8acc1a3c8e9f87003f9494b2cct";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="row">
            <div class="col-2">
              <div class="forecast-day">${formatDay(day.time)}</div>
              <div class="forecast-icon">
                <img
                  src="${day.condition.icon_url}"
                  alt=""
                  
                />
              </div>
              <div class="forecast-temperatures">
                <div class="forecast-temperature-max">${Math.round(
                  day.temperature.maximum
                )}°  </div>
                <div class="forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</div>
              </div>
            </div>
          </div>`;
    }
  });
  let forecastElemennt = document.querySelector("#forecast");
  forecastElemennt.innerHTML = forecastHtml;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    return `${day} ${hours}:0${minutes}`;
  } else {
    return `${day} ${hours}:${minutes}`;
  }
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
