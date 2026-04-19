const forecasts = [
  { city: "Bengaluru", condition: "Sunny", temperatureC: 29, humidity: 42, windKph: 14 },
  { city: "Mumbai", condition: "Humid", temperatureC: 31, humidity: 71, windKph: 18 },
  { city: "Tokyo", condition: "Cloudy", temperatureC: 22, humidity: 59, windKph: 11 },
  { city: "Berlin", condition: "Rain", temperatureC: 17, humidity: 76, windKph: 20 }
];

const searchInput = document.querySelector("#search-input");
const conditionFilter = document.querySelector("#condition-filter");
const unitInputs = document.querySelectorAll('input[name="temperature-unit"]');
const resetFiltersButton = document.querySelector("#reset-filters");
const weatherGrid = document.querySelector("#weather-grid");
const visibleCount = document.querySelector("#visible-count");
const warmestCity = document.querySelector("#warmest-city");
const lastUpdated = document.querySelector("#last-updated");

let selectedUnit = "c";

renderWeatherBoard();

searchInput.addEventListener("input", () => {
  renderWeatherBoard();
});

conditionFilter.addEventListener("change", () => {
  renderWeatherBoard();
});

unitInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    selectedUnit = event.target.value;
    renderWeatherBoard();
  });
});

resetFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  conditionFilter.value = "all";
  selectedUnit = "c";

  unitInputs.forEach((input) => {
    input.checked = input.value === "c";
  });

  renderWeatherBoard();
});

function renderWeatherBoard() {
  const filteredForecasts = getFilteredForecasts();
  renderSummary(filteredForecasts);
  renderCards(filteredForecasts);
}

function getFilteredForecasts() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCondition = conditionFilter.value;

  return forecasts.filter((forecast) => {
    const matchesQuery = forecast.city.toLowerCase().includes(query);
    const matchesCondition =
      selectedCondition === "all" || forecast.condition.toLowerCase() === selectedCondition;

    return matchesQuery && matchesCondition;
  });
}

function renderSummary(items) {
  visibleCount.textContent = String(items.length);
  warmestCity.textContent = items.length ? getWarmestCity(items) : "No matches";
  lastUpdated.textContent = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date());
}

function getWarmestCity(items) {
  const warmestForecast = items.reduce((currentWarmest, forecast) => {
    return forecast.temperatureC > currentWarmest.temperatureC ? forecast : currentWarmest;
  });

  return warmestForecast.city;
}

function formatTemperature(temperatureC) {
  if (selectedUnit === "f") {
    return `${Math.round((temperatureC * 9) / 5 + 32)}°F`;
  }

  return `${temperatureC}°C`;
}

function renderCards(items) {
  if (!items.length) {
    weatherGrid.innerHTML = `
      <div class="empty-state">
        No matching cities found. Try changing the search or selecting a different condition.
      </div>
    `;
    return;
  }

  weatherGrid.innerHTML = items
    .map(
      (forecast) => `
        <article class="card">
          <h2>${forecast.city}</h2>
          <p>${forecast.condition}</p>
          <p class="temp">${formatTemperature(forecast.temperatureC)}</p>
          <div class="meta">
            <span>Humidity ${forecast.humidity}%</span>
            <span>Wind ${forecast.windKph} km/h</span>
          </div>
        </article>
      `
    )
    .join("");
}
