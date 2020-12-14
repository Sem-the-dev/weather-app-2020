function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}



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
                
        //document.querySelector("#date").innerHTML = (response.data.dt)
                console.log(response.data.dt)
    
        celsiusTemperature = response.data.main.temp;
                
  let mainIconElement = document.querySelector("#main-weather-icon");
  mainIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
}

function formatHours(timestamp) {
  let date = new date(timestamp);
   let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
}

function getForecast(response){
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0]; 
  console.log(forecast);
  forecastElement.innerHTML = 
  `<div class="col border-right border-success">
  <strong> ${formatHours(forecast.dt * 1000)} </strong> 
  <br />
  H:${Math.round(forecast.main.temp_max)}° 
  L:${Math.round(forecast.main.temp_min)}° 
  <br />
  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png";>
  </div>`; 
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
}


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



let celsiusTemperature = null;


function ConvertToFahrenheit(event) {
  event.preventDefault();
  let nowTemp = document.querySelector("#main-current-temperature");
  //celsiusLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9)/5 +32;
  nowTemp.innerHTML = `${Math.round(fahrenheitTemp)}°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-bttn");
fahrenheitLink.addEventListener("click", ConvertToFahrenheit);

function ConvertToCelsius(event) {
  event.preventDefault();
  let nowTemp = document.querySelector("#main-current-temperature");
  nowTemp.innerHTML = `${Math.round(celsiusTemperature)}°`;
}
debugger;

let celsiusLink = document.querySelector("#celsius-bttn");
celsiusLink.addEventListener("click", ConvertToCelsius);

search("London");