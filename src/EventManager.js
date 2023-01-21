import { apiManager } from "./APIManager";
import { dynamicRenderer } from "./UIManager";

export const eventManager = (() =>
{
	try
	{
		const _locationCoordinates = {};
		async function _eventDelegator (event)
		{
			if (event.target.id === "searchLocationBtn" &&
          event.currentTarget !== document &&
          document.getElementById("locationsContainer") == null)
			{
				const locationValue = document.getElementById("searchLocation").value;
				const result = await apiManager.getLocations(locationValue);
				const locations = Object.values(result);
				if (locations.length === 0)
				{
					console.warn("Please enter a valid location.");
					return;
				}

				const cityAndCountry = getCityAndCountry(locations);
				dynamicRenderer.displayAvailableLocations(cityAndCountry);

				// add event handler to all available locations
				addEventHandler("locationsContainer", "click");

				// associate locations with coordinates
				const location = document.getElementById("locationsContainer").children;
				for (let i = 0; i < location.length; i++)
				{
					_locationCoordinates[location[i].id] = [result[i].lat, result[i].lon];
				}
			}
			else if (event.target != null && event.target.parentElement != null && event.currentTarget === document && event.target.id !== "searchLocationBtn" && event.target.parentElement.id !== "locationsContainer")
			{
				dynamicRenderer.removeAvailableLocations();
			}
			else if (event.target.parentElement != null && event.target.parentElement.id === "locationsContainer" && event.currentTarget !== document)
			{
				let currentWeatherInfo;
				if (_locationCoordinates !== undefined)
				{
					const lat = _locationCoordinates[event.target.id][0];
					const lon = _locationCoordinates[event.target.id][1];
					currentWeatherInfo = await apiManager.getCurrentWeatherInfo(lat, lon);
					console.log(currentWeatherInfo);
				}
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
	const arr = [];
	locations.forEach(element =>
	{
		let found = false;
		arr.forEach(value =>
		{
			if (value[0] === element.name && value[1] === element.country)
			{
				found = true;
			}
		});
		if (!found)
		{
			arr.push([element.name, element.country]);
		}
	});
	return arr;
}
