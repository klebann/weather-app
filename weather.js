const WeatherApp = class {
	constructor(apiKey, resultsBlockSelector) {
		this.apiKey = apiKey;
		this.resultsBlock = document.querySelector(resultsBlockSelector);

		this.coordinatesLink = `http://api.openweathermap.org/geo/1.0/direct?q={query}&appid=${apiKey}`;
		this.currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;
		this.forecastLink = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}&units=metric`;
	}

	getCurrentWeather(query) {
		this.getCoordinates(query, (lat, lon) => {
			let url = this.currentWeatherLink.replace("{lat}", lat);
			url = url.replace("{lon}", lon);
			this.sendReq(url, (currentWeather) => {
				console.log(currentWeather);
				this.drawWeather(currentWeather);
			})
		});
	}

	getCoordinates(query, callbackFunction) {
		let url = this.coordinatesLink.replace("{query}", query);
		this.sendReq(url, (response) => {
			const coordinates = response[0];
			const lat = coordinates.lat;
			const lon = coordinates.lon;
			callbackFunction(lat, lon);
		})
	}

	sendReq(url, callbackFunction) {
		let req = new XMLHttpRequest();
		req.open("GET", url, true);
		req.addEventListener("load", () => {
			const response = JSON.parse(req.responseText);
			callbackFunction(response);
		});
		req.send();
	}

	getForecast(query) {
		this.getCoordinates(query, (lat, lon) => {
			let url = this.forecastLink.replace("{lat}", lat);
			url = url.replace("{lon}", lon);
			fetch(url)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					this.drawForecastWeather(data.list);
				});
		});
	}

	getWeather(query) {

	}
	
	drawForecastWeather(forecastWeather) {
		for (let i = 0; i < forecastWeather.length; i++) {
			let weather = forecastWeather[i];
			this.drawWeather(weather);
		}
	}

	drawWeather(weather) {
		const date = new Date(weather.dt * 1000);
		const weatherBlock = this.createWeatherBlock(
			`${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`,
			weather.main.temp,
			weather.main.feels_like,
			weather.weather[0].icon,
			weather.weather[0].description
		);
		this.resultsBlock.appendChild(weatherBlock);
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

document.querySelector("#checkButton").addEventListener("click", function () {
	const query = document.querySelector("#locationInput").value;
	document.weatherApp.getForecast(query);
});
