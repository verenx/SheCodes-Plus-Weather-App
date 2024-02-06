function refreshWeatherData(response) {
  console.log(response);
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
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="row">
            <div class="col-2">
              <div class="forecast-day">${day}</div>
              <div class="forecast-icon">
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
                  alt=""
                  width="36"
                />
              </div>
              <div class="forecast-temperatures">
                <span class="forecast-temperature-max"> 18°</span>
                <span class="forecast-temperature-min"> 9°</span>
              </div>
            </div>
          </div>`;
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
displayForecast();
