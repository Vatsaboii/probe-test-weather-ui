const forecasts = [
  { city: "Bengaluru", condition: "Sunny", temperature: 29, humidity: 42, windKph: 14 },
  { city: "Mumbai", condition: "Humid", temperature: 31, humidity: 71, windKph: 18 },
  { city: "Tokyo", condition: "Cloudy", temperature: 22, humidity: 59, windKph: 11 },
  { city: "Berlin", condition: "Rain", temperature: 17, humidity: 76, windKph: 20 }
];

const searchInput = document.querySelector("#search-input");
const weatherGrid = document.querySelector("#weather-grid");

renderCards(forecasts);

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const filteredForecasts = forecasts.filter((forecast) =>
    forecast.city.toLowerCase().includes(query)
  );

  renderCards(filteredForecasts);
});

function renderCards(items) {
  if (!items.length) {
    weatherGrid.innerHTML = `
      <div class="empty-state">
        No matching cities found. Try a broader search.
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
          <p class="temp">${forecast.temperature}&deg;C</p>
          <div class="meta">
            <span>Humidity ${forecast.humidity}%</span>
            <span>Wind ${forecast.windKph} km/h</span>
          </div>
        </article>
      `
    )
    .join("");
}
