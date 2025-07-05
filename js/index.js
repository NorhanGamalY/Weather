window.addEventListener('DOMContentLoaded', () => {
  cityWeather('Cairo');         

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
      cityWeather(coords);     
    });
  }
});


let searchInput
document.getElementById('search-input').addEventListener('input', function(){
searchInput = document.getElementById('search-input').value;
console.log(searchInput)
cityWeather(searchInput)
});




async function cityWeather(city) {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b668bba74d804de3a8d10011250507&q=${city}&days=3`)
if(response.ok){
    let data = await response.json();
    displayWeather(data)
}
}



function displayWeather(result){

function dayTransition(dateString){
  let date = new Date(dateString);
   return date.toLocaleDateString('en-US', { weekday: 'long' })

}
    let weatherData = `
     <div class="day-1 col-4">
        <div class="day-name w-100 d-flex justify-content-around"><div>${dayTransition(result.forecast.forecastday[0].date)}</div> <div>${result.forecast.forecastday[0].date}</div></div>
        <div class="weather text-start">
        <div id="city" class="ms-3 w-100">${result.location.name}</div>
        <div id="temp" class="m-3 w-100">${result.current.temp_c}oC</div>
        <div id="condition-icon" class="ms-3"><img  src="${result.current.condition.icon}" alt="wether"></div>
        <div id="condition-text" class="ms-3">${result.current.condition.text}</div>

        <ul>
        <li><i class="fa-solid fa-umbrella"></i>${result.forecast.forecastday[0].day.daily_chance_of_rain}%</li>
        <li class="mx-4"><i class="fa-solid fa-wind"></i> ${result.forecast.forecastday[0].day.maxwind_mph}m/h</li>
        <li> <i class="fa-solid fa-compass"></i> ${result.current.wind_dir} </li>

        </ul>

        </div>
    </div>
    </div>
    <div class="day-2 col-4">
        <div class="day-name w-100">${dayTransition(result.forecast.forecastday[1].date)}</div>
        <div class="weather">
        <div class="condition-icon ms-3"><img  src="${result.forecast.forecastday[1].day.condition.icon}" alt="wether"></div>
        <div class="max ms-3">${result.forecast.forecastday[1].day.maxtemp_c}oC</div>
        <div class="min ms-3">${result.forecast.forecastday[1].day.mintemp_c}o</div>
        <div class="condition-text ms-3">${result.forecast.forecastday[1].day.condition.text}</div>

        </div>
    </div>
    <div class="day-3 col-4">
        <div class="day-name w-100">${dayTransition(result.forecast.forecastday[2].date)}</div>
        <div class="weather">
        <div  class="condition-icon ms-3"><img  src="${result.forecast.forecastday[2].day.condition.icon}" alt="wether"></div>
        <div class="max ms-3">${result.forecast.forecastday[2].day.maxtemp_c}oC</div>
        <div class="min ms-3">${result.forecast.forecastday[2].day.mintemp_c}o</div>
        <div  class="condition-text ms-3">${result.forecast.forecastday[2].day.condition.text}</div>

        </div>
    </div>
    `
document.getElementById('weather-details').innerHTML=weatherData;
}
