function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let now = new Date();

dateElement.innerHTML = formatDate(now);

//

function getWeather(response) {
  document.querySelector("#main-current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(
    "#weatherDescription"
  ).innerHTML = `${response.data.weather[0].main}`;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

let mainIconElement = document.querySelector("#main-weather-icon");
mainIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}

let enterCity = document.querySelector("#search-engine");
enterCity.addEventListener("submit", changeCity);

function search(city) {
  let apiKey = `aea55e6fcec85bd9372335be0d239f49`;
  let apiCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiCityUrl).then(getWeather);
}

search("London");

function showPosition(position) {
  let apiKey = `aea55e6fcec85bd9372335be0d239f49`;
  let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiLocationUrl).then(getWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let hereButton = document.querySelector("#current-location");
hereButton.addEventListener("click", getPosition);

function ConvertToFahrenheit(event) {
  event.preventDefault();
  let nowTemp = document.querySelector("#main-current-temperature");
  nowTemp.innerHTML = "66°";
}

let fahrenheit = document.querySelector("#fahrenheit-bttn");
fahrenheit.addEventListener("click", ConvertToFahrenheit);

function ConvertToCelcius(event) {
  event.preventDefault();
  let nowTemp = document.querySelector("#main-current-temperature");
  nowTemp.innerHTML = "21°";
}

let celcius = document.querySelector("#celcius-bttn");
celcius.addEventListener("click", ConvertToCelcius);
