import { apiManager } from "./APIManager";
import { dynamicRenderer } from "./UIManager";

export const eventManager = (() =>
{
	try
	{
		const _locationCoordinates = {};
		// eslint-disable-next-line no-trailing-spaces
    
		async function _eventDelegator (event)
		{
			if (event.target.id === "searchLocationBtn" &&
          event.currentTarget !== document &&
          document.getElementById("locationsContainer") == null)
			{
				const locationInputValue = document.getElementById("searchLocation").value;
				const locations = await apiManager.getLocations(locationInputValue);
				if (locations.length === 0)
				{
					console.warn("Please enter a valid location.");
					return;
				}

				const [cityAndCountry, locationsNew] = getCityAndCountry(locations);
				dynamicRenderer.displayAvailableLocations(cityAndCountry);

				// add event handler to all available locations
				addEventHandler("locationsContainer", "click");

				// associate locations with coordinates
				const locationHTMLElements = document.getElementById("locationsContainer").children;
				for (let i = 0; i < locationHTMLElements.length; i++)
				{
					_locationCoordinates[locationHTMLElements[i].id] = [locationsNew[i].lat, locationsNew[i].lon];
				}
			}
			else if (event.target != null && event.target.parentElement != null && event.currentTarget === document &&
                event.target.id !== "searchLocationBtn" && event.target.parentElement.id !== "locationsContainer")
			{
				dynamicRenderer.removeAvailableLocations();
			}
			else if (event.target.parentElement != null && event.target.parentElement.id === "locationsContainer" &&
        event.currentTarget !== document)
			{
				const locationName = event.target.innerText;

				if ((locationName.split(",")[0].trim() !== document.getElementById("city").innerText.split(",")[0].trim() ||
            locationName.split(",")[1].trim() !== document.getElementById("country").innerText) &&
            _locationCoordinates !== undefined)
				{
					dynamicRenderer.removeCurrentWeatherInfo();
					dynamicRenderer.removeWeeklyWeatherInfo();

					const lat = _locationCoordinates[event.target.id][0];
					const lon = _locationCoordinates[event.target.id][1];

					const currentWeatherData = await apiManager.getCurrentWeatherInfo(lat, lon);
					const weeklyWeatherData = await apiManager.getWeeklyWeatherInfo(lat, lon);

					// render current and weekly weather data
					dynamicRenderer.showCurrentWeatherData(currentWeatherData, locationName);
					dynamicRenderer.showWeeklyWeatherData(weeklyWeatherData);
					console.log(weeklyWeatherData);
				}
				dynamicRenderer.removeAvailableLocations();
			}
		}

		function addEventHandler (elementID, eventType)
		{
			document.getElementById(elementID).addEventListener(eventType, _eventDelegator);
		}

		function setup ()
		{
			addEventHandler("searchLocationBtn", "click");
			document.addEventListener("click", _eventDelegator);
		}

		return {
			setup,
			addEventHandler
		};
	}
	catch (error)
	{
		console.log(error.message);
	}
})();

function getCityAndCountry (locations)
{
	const cityAndCountryArr = [];
	const locationsNew = [];
	locations.forEach(element =>
	{
		let found = false;
		cityAndCountryArr.forEach(value =>
		{
			if (value[0] === element.name && value[1] === element.country)
			{
				found = true;
			}
		});
		if (!found)
		{
			cityAndCountryArr.push([element.name, element.country]);
			locationsNew.push(element);
		}
	});
	return [cityAndCountryArr, locationsNew];
}
