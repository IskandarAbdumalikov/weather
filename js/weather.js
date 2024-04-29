let weatherWrapper = document.querySelector(".weather__wrapper");
let weatherRegion = document.querySelector(".weather__region");
let weatherInfo = document.querySelector(".weather__info");
let weatherImage = document.querySelector(".weather__image");
let weatherDegree = document.querySelector(".weather__degree");
let weatherDesc = document.querySelector(".weather__desc");
let searchForm = document.querySelector(".search__form");
let searchInput = document.querySelector(".search__input");
let searchBtn = document.querySelector(".search__button");
let forecastDay = document.querySelector(".forecastday");
let weekDay = document.querySelector(".week__day");
let weekDayAfter = document.querySelector(".week__day__after");
let weekDayToday = document.querySelector(".week__day__today");
let otherDaysImg = document.querySelector(".other__days__img");
let otherDaysMaxCelciy = document.querySelector(".other__days__maxcelciy");
let otherDaysMinCelciy = document.querySelector(".other__days__mincelciy");
let otherDayDesc = document.querySelector(".other__day__desc__info");
let otherDaysImgAfter = document.querySelector(".other__days__img__after");
let otherDaysMaxCelciyAfter = document.querySelector(
  ".other__days__maxcelciy__after"
);
let otherDaysMinCelciyAfter = document.querySelector(
  ".other__days__mincelciy__after"
);
let otherDayDescAfter = document.querySelector(
  ".other__day__desc__info__after"
);
let hero = document.querySelector(".hero");

const API__URL =
  "https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=Tashkent&days=7&aqi=yes&alerts=yes";

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData();
});

async function fetchWeatherData(region = "Tashkent") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`
  );
  response
    .json()
    .then((res) => {
      if (res.error) {
        throw new Error("City  is not found ,please enter city name true");
      }
      renderWeather(res);
    })
    .catch((err) => {
      alert(err);
    });
}

function renderWeather(data) {
  weatherRegion.innerHTML = `${data.location.name}. ${data.location.country}`;
  weatherDegree.textContent = `${data.current.temp_c}°`;
  weatherImage.src = data.current.condition.icon;
  weatherDesc.textContent = data.current.condition.text;
  weekDayToday.innerHTML = otherDaysImg.src =
    data.forecast.forecastday[1].day.condition.icon;
  otherDayDesc.innerHTML = data.forecast.forecastday[1].day.condition.text;
  otherDaysMaxCelciy.innerHTML = `Max : ${data.forecast.forecastday[1].day.maxtemp_c}°`;
  otherDaysMinCelciy.innerHTML = `Min : ${data.forecast.forecastday[1].day.mintemp_c}°`;
  otherDaysImgAfter.src = data.forecast.forecastday[2].day.condition.icon;
  otherDayDescAfter.innerHTML = data.forecast.forecastday[2].day.condition.text;
  otherDaysMaxCelciyAfter.innerHTML = `Max : ${data.forecast.forecastday[2].day.maxtemp_c}°`;
  otherDaysMinCelciyAfter.innerHTML = `Min : ${data.forecast.forecastday[2].day.mintemp_c}°`;
  let forecastDayItem = "";
  let date = new Date();
  let hour = date.getHours();
  let weekNum = date.getDay();
  switch (weekNum + 1) {
    case 0:
      weekDayAfter.innerHTML = "Monday";
      weekDay.innerHTML = "Sunday";
      weekDayToday.innerHTML = "Saturday";
      break;
    case 1:
      weekDayAfter.innerHTML = "Tuesday";
      weekDay.innerHTML = "Monday";
      weekDayToday.innerHTML = "Sunday";
      break;
    case 2:
      weekDayAfter.innerHTML = "Wednesday";
      weekDay.innerHTML = "Tuesday";
      weekDayToday.innerHTML = "Monday";
      break;
    case 3:
      weekDayAfter.innerHTML = "Thursday";
      weekDay.innerHTML = "Wednesday";
      weekDayToday.innerHTML = "Tuesday";
      break;
    case 4:
      weekDayAfter.innerHTML = "Friday";
      weekDay.innerHTML = "Thursday";
      weekDayToday.innerHTML = "Wednesday";
      break;
    case 5:
      weekDayAfter.innerHTML = "Saturday";
      weekDay.innerHTML = "Friday";
      weekDayToday.innerHTML = "Thursday";
      break;
    case 6:
      weekDayAfter.innerHTML = "Sunday";
      weekDay.innerHTML = "Saturday";
      weekDayToday.innerHTML = "friday";
      break;
    default:
      break;
  }
  data.forecast.forecastday[0].hour.slice(hour + 1).forEach((element) => {
    forecastDayItem += `
      <div class="forecastday__item">
          <p>${element.time.split(" ")[1]}</p>
          <img src="${element.condition.icon}" alt="">
          <p>${element.temp_c}°</p>
      </div>
    `;
  });
  forecastDay.innerHTML = forecastDayItem;
  console.log(data);
  switch (data.current.condition.text) {
    case "Sunny":
      hero.classList.remove("hero__cloudy");
      hero.classList.remove("hero__rainy");
      hero.classList.add("hero__sunny");
      hero.classList.remove("hero__clear");
      break;
    case "Light rain":
      hero.classList.remove("hero__cloudy");
      hero.classList.add("hero__rainy");
      hero.classList.remove("hero__sunny");
      hero.classList.remove("hero__clear");
      break;
    case "Light rain shower":
      hero.classList.remove("hero__cloudy");
      hero.classList.add("hero__rainy");
      hero.classList.remove("hero__sunny");
      hero.classList.remove("hero__clear");
      break;
    case "Patchy rain nearby":
      hero.classList.remove("hero__cloudy");
      hero.classList.add("hero__rainy");
      hero.classList.remove("hero__sunny");
      hero.classList.remove("hero__clear");
      break;
    case "Partly cloudy":
      hero.classList.add("hero__cloudy");
      hero.classList.remove("hero__rainy");
      hero.classList.remove("hero__sunny");
      hero.classList.remove("hero__clear");
      break;
    case "Cloudy":
      hero.classList.add("hero__cloudy");
      hero.classList.remove("hero__rainy");
      hero.classList.remove("hero__sunny");
      hero.classList.remove("hero__clear");
      break;
    case "Overcast":
      hero.classList.add("hero__cloudy");
      hero.classList.remove("hero__rainy");
      hero.classList.remove("hero__sunny");
      hero.classList.remove("hero__clear");
      break;
    case "Clear":
      hero.classList.remove("hero__cloudy");
      hero.classList.remove("hero__rainy");
      hero.classList.remove("hero__sunny");
      hero.classList.add("hero__clear");
      break;
    case "Mist":
      hero.classList.remove("hero__cloudy");
      hero.classList.remove("hero__rainy");
      hero.classList.remove("hero__sunny");
      hero.classList.add("hero__mist");
      break;
    default:
      break;
  }
}

console.log(7);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchInputValue = searchInput.value;
  fetchWeatherData(searchInputValue);
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let searchInputValue = searchInput.value;
  fetchWeatherData(searchInputValue);
});
