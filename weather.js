const WeatherApp = class {
    constructor(apiKey, resultsBlockSelector) {
			this.apiKey = apiKey;
			this.resultsBlock = document.querySelector(resultsBlockSelector);
    }

    getCurrentWeather(query) {

    }

    getForecast(query) {

    }

    getWeather(query) {
			const weatherBlock = this.createWeatherBlock('2020-11-20 23:24', 21.12, 24.21, '04n', 'broken clouds');
			this.resultsBlock.appendChild(weatherBlock);
    }

    drawWeather() {

    }

    createWeatherBlock(dateString, temperature, feelsLikeTemperature, iconName, description) {
			const weatherBlock = document.createElement("div");
			weatherBlock.className = 'weather-block';
			
			const dateBlock = document.createElement("div");
			dateBlock.className = "weather-date";
			dateBlock.innerHTML = dateString;
			weatherBlock.appendChild(dateBlock);
			
			const temperatureBlock = document.createElement("div");
			temperatureBlock.className = "weather-temperature";
			temperatureBlock.innerHTML = `${temperature} &deg;C`;
			weatherBlock.appendChild(temperatureBlock);
			
			const temperatureFeelBlock = document.createElement("div");
			temperatureFeelBlock.className = "weather-temperature-feels-like";
			temperatureFeelBlock.innerHTML = `Feel: ${feelsLikeTemperature} &deg;C`;
			weatherBlock.appendChild(temperatureFeelBlock);
			
			const iconImg = document.createElement("img");
			iconImg.className = "weather-icon";
			iconImg.src = `http://openweathermap.org/img/wn/${iconName}@2x.png`
			weatherBlock.appendChild(iconImg);
			
			const descriptionBlock = document.createElement("div");
			descriptionBlock.className = "weather-description";
			descriptionBlock.innerHTML = description;
			weatherBlock.appendChild(descriptionBlock);
			
			return weatherBlock;
    }
}

document.weatherApp = new WeatherApp("7ded80d91f2b280ec979100cc8bbba94", "#weather-results-container");

document.querySelector("#checkButton").addEventListener("click", function() {
    const query = document.querySelector("#locationInput").value;
    document.weatherApp.getWeather(query);
});