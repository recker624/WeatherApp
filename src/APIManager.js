const apiManager = (() =>
{
	const _appID = "8dfe9d6cff5836fcd97de9a07e951859";

	async function getLocations (city, locationCount = 5)
	{
		try
		{
			console.log("api called!");
			const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${locationCount}&appid=${_appID}`, { mode: "cors" });
			const locations = await response.json();
			return locations;
		}
		catch (error)
		{
			console.log(error.message);
		}
	}

	async function getWeatherInfo (lat, lon)
	{
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${_appID}`, { mode: "cors" });
		const weatherInfo = await response.json();
		return weatherInfo;
	}

	return {
		getWeatherInfo,
		getLocations
	};
})();

export { apiManager };
