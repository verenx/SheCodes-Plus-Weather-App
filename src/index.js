function changeCity(event) {
  event.preventDefault();
  let searchFormElement = document.querySelector("#search-input");
  let currentCityHeading = document.querySelector("#heading-current-city");
  currentCityHeading.innerHTML = searchFormElement.value;
}

let searchFormButton = document.querySelector("#search-button");
searchFormButton.addEventListener("click", changeCity);
