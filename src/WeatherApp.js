"use strict";
import { mapToStyles } from "@popperjs/core/lib/modifiers/computeStyles";
import { eventManager } from "./EventManager";
import { dynamicRenderer, staticRenderer } from "./UIManager";
import { apiManager } from "./APIManager";
import "./styles/style.scss";

eventManager.setup();
staticRenderer.setup();

apiManager.getLocations("New Delhi").then(result =>
{
	const locations = Object.values(result);
	for (let i = 0; i < locations.length; i++)
	{
		if (locations[i].country === "IN")
		{
			apiManager.getCurrentWeatherInfo(locations[i].lat, locations[i].lon)
				.then(result => console.log(result));
			apiManager.getWeeklyWeatherInfo(locations[i].lat, locations[i].lon)
				.then(result => console.log(result));
		}
	}
});
