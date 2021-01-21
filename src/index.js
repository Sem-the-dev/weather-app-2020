function formatDate(timestamp) {
  let date = new Date(timestamp);
  
  let hours = date.getHours();
  if (hours < 10) {hours = `0${hours}`}
  
  let minutes = date.getMinutes();
  if (minutes < 10) {minutes = `0${minutes}`};
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
  return `${day} ${hours}:${minutes}`;
}


function formatHours(timestamp) {
  let date = new Date(timestamp * 1000); 
  let hours = date.getHours();
  if (hours < 10) {hours = `0${hours}`}
  
  let minutes = date.getMinutes();
  if (minutes < 10) {minutes = `0${minutes}`};
  return `${hours}:${minutes}`;
}


function getWeather(response) {

  
  document.querySelector("#main-current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#weather-description"
  ).innerHTML = `${response.data.weather[0].main}`;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°`;
  celsiusFeelsLikeTemp = response.data.main.feels_like;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#sunrise").innerHTML = 
  formatHours(response.data.sys.sunrise + response.data.timezone);
 
   document.querySelector("#sunset").innerHTML = 
  formatHours(response.data.sys.sunset + response.data.timezone);
  
  
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = response.data.main.temp;
  
  let mainIconElement = document.querySelector("#main-weather-icon");
  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.removeEventListener("click", convertToCelsius);
}



function getForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null; 

  for (let index = 0; index < 6; index++){
  forecast = response.data.list[index];
  
forecastElement.innerHTML += 
`<div class="row forecast">
<div class="col">
${formatHours(forecast.dt)} <br>
<img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/> 
<br>
H:<span class="forecast-max">${Math.round(forecast.main.temp_max)}</span>° 
L:<span class="forecast-min">${Math.round(forecast.main.temp_min)}</span>°  

      </div> 
      </div> 
`;
}
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
  let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(forecastUrl).then(getForecast);

  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  celsiusLink.removeEventListener("click", convertToCelsius);

}


function showPosition(position) {
  let apiKey = `aea55e6fcec85bd9372335be0d239f49`;
  let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiLocationUrl).then(getWeather);
  
  let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(forecastUrl).then(getForecast);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let hereButton = document.querySelector("#current-location");
hereButton.addEventListener("click", getPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-bttn");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-bttn");
//celsiusLink.addEventListener("click", convertToCelsius);


let celsiusTemperature = null;
let celsiusFeelsLikeTemp = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let nowTemp = document.querySelector("#main-current-temperature");
  let feelsLikeTemp = document.querySelector("#feels-like");
  
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  nowTemp.innerHTML = `${Math.round(fahrenheitTemp)}°`;

  let fahrenheitFeelsLikeTemp = (celsiusFeelsLikeTemp * 9) / 5 + 32;
  feelsLikeTemp.innerHTML = `${Math.round(fahrenheitFeelsLikeTemp)}°`

  //celsiusLink.classList.add("active");
  //fahrenheitLink.classList.remove("active"); 
  


let forecastItemsMax = document.querySelectorAll(".forecast-max");
  forecastItemsMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = `${Math.round((currentTemp * 9) / 5 + 32)}`;
  });

  let forecastItemsMin = document.querySelectorAll(".forecast-min");
  forecastItemsMin.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = `${Math.round((currentTemp * 9) / 5 + 32)}`;
  
  celsiusLink.addEventListener("click", convertToCelsius);
  fahrenheitLink.removeEventListener("click", convertToFahrenheit);

  });
}



function convertToCelsius(event) {
  event.preventDefault();
  let nowTemp = document.querySelector("#main-current-temperature");
  nowTemp.innerHTML = `${Math.round(celsiusTemperature)}°`;
  
  let feelsLikeTemp = document.querySelector("#feels-like");
  feelsLikeTemp.innerHTML = `${Math.round(celsiusFeelsLikeTemp)}°`

  //celsiusLink.classList.remove("active");
  //fahrenheitLink.classList.add("active");

  let forecastItemsMax = document.querySelectorAll(".forecast-max");
  forecastItemsMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}`;
  });

  let forecastItemsMin = document.querySelectorAll(".forecast-min");
  forecastItemsMin.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}`;
  });
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  celsiusLink.removeEventListener("click", convertToCelsius)

}




search("London");